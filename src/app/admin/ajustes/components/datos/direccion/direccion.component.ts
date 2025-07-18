import {
  ChangeDetectorRef, Component, OnInit,
  AfterViewInit,
  NgZone,
  ElementRef,
  ViewChild
} from '@angular/core';
import { DatosClienteModel } from '../../../models/datos-cliente.model';
import { DatosService, SharedDatosService } from '../../../services/datos.service';
import { StateDatosService } from '../../../services/state-datos.service';
import Swal from 'sweetalert2';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-direccion',
  templateUrl: './direccion.component.html',
  styleUrl: './direccion.component.css'
})
export class DireccionComponent {

  visible: boolean = false;
  datosCliente!: DatosClienteModel;
  loading: boolean = false;
  map!: google.maps.Map;
  marker!: google.maps.Marker;
  private datosSub!: Subscription;

  constructor(
    private sharedDatos: SharedDatosService,
    private stateDatos: StateDatosService,
    private datosService: DatosService,
    private cd: ChangeDetectorRef,
    private ngZone: NgZone
  ) { }

  ngOnInit(): void {
    this.visible = true;

    this.datosSub = this.sharedDatos.current.subscribe(datos => {
      this.datosCliente = datos;
      setTimeout(() => {
        this.initMap();
        this.initAutocomplete();
      }, 200);
    });
  }

  ngOnDestroy() {
    if (this.datosSub) {
      this.datosSub.unsubscribe();
    }
  }

  // private initMap(): void {
  //   const center = { lat: 32.6245, lng: -115.4523 };

  //   this.map = new google.maps.Map(document.getElementById('map') as HTMLElement, {
  //     center,
  //     zoom: 14,
  //   });

  //   this.marker = new google.maps.Marker({
  //     position: center,
  //     map: this.map,
  //   });
  // }

  // private initAutocomplete(): void {
  //   const input = document.getElementById('autocomplete') as HTMLInputElement;
  //   const autocomplete = new google.maps.places.Autocomplete(input);

  //   autocomplete.addListener('place_changed', () => {
  //     this.ngZone.run(() => {
  //       const place = autocomplete.getPlace();

  //       if (!place.geometry || !place.geometry.location) return;

  //       const location = place.geometry.location;

  //       this.map.setCenter(location);
  //       this.map.setZoom(16);
  //       this.marker.setPosition(location);
  //     });
  //   });
  // }

  private initMap(): void {
    const tieneUbicacion = this.datosCliente.ubicacion_lat != null && this.datosCliente.ubicacion_lng != null;

    const center = tieneUbicacion
      ? { lat: this.datosCliente.ubicacion_lat!, lng: this.datosCliente.ubicacion_lng! }
      : { lat: 32.6245, lng: -115.4523 };

    this.map = new google.maps.Map(document.getElementById('map') as HTMLElement, {
      center,
      zoom: tieneUbicacion ? 16 : 14,
    });

    this.marker = new google.maps.Marker({
      position: center,
      map: this.map,
    });

    if (tieneUbicacion && this.datosCliente.direccion) {
      const input = document.getElementById('autocomplete') as HTMLInputElement;
      input.value = this.datosCliente.direccion;
    }
  }

  cancelar() {
    this.visible = false;
    this.stateDatos.cancelarDireccion();
  }

  get puedeGuardar(): boolean {
    return !!this.datosCliente?.direccion?.trim()
      && this.datosCliente.ubicacion_lat != null
      && this.datosCliente.ubicacion_lng != null
      && !this.loading;
  }

  private initAutocomplete(): void {
    const input = document.getElementById('autocomplete') as HTMLInputElement;
    const autocomplete = new google.maps.places.Autocomplete(input);

    autocomplete.addListener('place_changed', () => {
      this.ngZone.run(() => {
        const place = autocomplete.getPlace();

        if (!place.geometry || !place.geometry.location) return;

        const location = place.geometry.location;

        // Actualizar datos del cliente
        this.datosCliente.direccion = input.value;
        this.datosCliente.ubicacion_lat = location.lat();
        this.datosCliente.ubicacion_lng = location.lng();

        this.map.setCenter(location);
        this.map.setZoom(16);
        this.marker.setPosition(location);
      });
    });
  }

  guardar() {
    this.loading = true;
    console.log('Direccion Cliente Model', this.datosCliente);
    this.datosService.guardarDireccion(this.datosCliente).subscribe(resp => {
      console.log('FromBackend', resp);
      this.stateDatos.savedDireccion();
    }, error => {
      console.log('error', error);
      this.stateDatos.cancelarDireccion();
      Swal.fire({ title: 'Error al guardar', text: '', icon: 'warning' });
    });
  }
  
}
