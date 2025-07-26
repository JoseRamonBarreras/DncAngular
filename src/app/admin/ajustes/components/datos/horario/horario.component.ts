import { ChangeDetectorRef, Component } from '@angular/core';
import { FormArray, FormBuilder, FormGroup, Validators } from '@angular/forms';
import { DatosClienteModel } from '../../../models/datos-cliente.model';
import { SharedDatosService } from '../../../services/datos.service';
import { StateDatosService } from '../../../services/state-datos.service';
import { HorarioService } from '../../../services/horario.service';
import { HorarioModel } from '../../../models/horario.model';
import Swal from 'sweetalert2';

type DialogPosition = 'center' | 'top' | 'bottom' | 'left' | 'right' | 'topleft' | 'topright' | 'bottomleft' | 'bottomright';

@Component({
  selector: 'app-horario',
  templateUrl: './horario.component.html',
  styleUrl: './horario.component.css'
})
export class HorarioComponent {
  visible: boolean = false;
  position: DialogPosition = 'top';
  horarioForm!: FormGroup;
  datosCliente!: DatosClienteModel;
  loading: boolean = false;
  horarios: HorarioModel[] = [];

  constructor(
    private sharedDatos: SharedDatosService,
    private stateDatos: StateDatosService,
    private horarioService: HorarioService,
    private cd: ChangeDetectorRef,
    private fb: FormBuilder,
  ) {

  }

  ngOnInit(): void {
    this.createForm();
    this.showDialog();
    this.getHorariosCliente();
  }

  private getHorariosCliente() {
    const clienteId = Number(localStorage.getItem('cliente_id'));

    this.horarioService.horarios(clienteId).subscribe(
      (resp) => {
        console.log('Horarios Fromackend', resp);
        this.horarios = resp.horarios.map((h: HorarioModel) => ({
          ...h,
          activo: Boolean(h.activo)
        }));

        console.log('Los horarios', this.horarios);

        this.horarios.forEach((h, index) => {

          this.dias.at(index).patchValue({
            dia: h.dia_semana,
            activo: Boolean(h.activo),
            horaInicio: h.abre_desde,
            horaFin: h.cierra_hasta,
          });


        });

        console.log('Horarios cargados', this.horarios);
      },
      (error) => {
        console.error('Error al cargar horarios', error);
      }
    );
  }




  createForm() {
    this.horarioForm = new FormGroup({
      dias: this.fb.array([]) // ← clave
    });

    for (let i = 0; i < 7; i++) {
      this.dias.push(this.fb.group({
        dia: [i],
        activo: [false],
        horaInicio: [''],
        horaFin: ['']
      }));
    }
  }

  get dias(): FormArray {
    return this.horarioForm.get('dias') as FormArray;
  }

  getNombreDia(index: number): string {
    const dias = ['Domingo', 'Lunes', 'Martes', 'Miércoles', 'Jueves', 'Viernes', 'Sábado'];
    return dias[index];
  }

  horas = Array.from({ length: 48 }, (_, i) => {
    const h = Math.floor(i / 2);
    const m = i % 2 === 0 ? '00' : '30';
    const value = `${String(h).padStart(2, '0')}:${m}:00`;

    const h12 = h % 12 === 0 ? 12 : h % 12;
    const period = h < 12 ? 'AM' : 'PM';
    const label = `${h12}:${m} ${period}`;

    return { label, value };
  });


  showDialog(position: DialogPosition = 'top'): void {
    this.position = position;
    this.visible = true;
  }

  cancelar() {
    this.visible = false;
    this.stateDatos.cancelarHorario();
  }

  guardar() {
    this.loading = true;
    const data = this.horarioForm.value.dias;
    console.log('Guardando horarios', data);
    this.horarioService.guardarHorario(Number(localStorage.getItem('cliente_id')), data).subscribe(resp => {
      console.log('FromBackend', resp);
      this.visible = false;
      this.stateDatos.savedHorario();
    }, error => {
      console.log('error', error);
      this.visible = false;
      this.stateDatos.cancelarHorario();
      Swal.fire({ title: 'Error al guardar', text: '', icon: 'warning' });


    });
  }
}
