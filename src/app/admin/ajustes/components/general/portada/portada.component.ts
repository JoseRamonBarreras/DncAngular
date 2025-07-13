import { Component } from '@angular/core';
import { StateGeneralService } from '../../../services/state-general.service';
import { DomSanitizer } from '@angular/platform-browser';
import { AjusteService } from '../../../services/ajuste.service';
import { ImageCroppedEvent, LoadedImage } from 'ngx-image-cropper';
import Swal from 'sweetalert2';

type DialogPosition = 'center' | 'top' | 'bottom' | 'left' | 'right' | 'topleft' | 'topright' | 'bottomleft' | 'bottomright';

@Component({
  selector: 'app-portada',
  templateUrl: './portada.component.html',
  styleUrl: './portada.component.css'
})
export class PortadaComponent {
  visible: boolean = false;
    position: DialogPosition = 'top';
    imageChangedEvent: any = '';
    croppedImage: any = '';
  
    constructor(
      private stateGeneral: StateGeneralService,
      private sanitizer: DomSanitizer,
      private ajusteService: AjusteService
    ) {
  
    }
  
    ngOnInit(): void {
      this.position = 'top';
      this.visible = true;
    }
  
    fileChangeEvent(event: any): void {
      this.imageChangedEvent = event;
    }
  
    imageCropped(event: ImageCroppedEvent | any) {
      if (event.blob) {
        this.resizeImage(event.blob, 770).then(base64 => {
          this.croppedImage = base64;
          console.log('Cropped + Resized Image:', this.croppedImage);
        });
      } else {
        console.error('No blob in cropped event');
      }
    }
  
  
    resizeImage(blob: Blob, maxWidth: number): Promise<string> {
      return new Promise((resolve, reject) => {
        const img = new Image();
        const url = URL.createObjectURL(blob);
  
        img.onload = () => {
          const canvas = document.createElement('canvas');
          let scale = 1;
  
          if (img.width > maxWidth) {
            scale = maxWidth / img.width;
          }
  
          canvas.width = img.width * scale;
          canvas.height = img.height * scale;
  
          const ctx = canvas.getContext('2d');
          if (ctx) {
            // Simula 72 DPI (no se puede establecer realmente en web, pero sí reducir tamaño visual)
            ctx.drawImage(img, 0, 0, canvas.width, canvas.height);
  
            // Exportar como PNG o JPEG según prefieras
            canvas.toBlob(resizedBlob => {
              const reader = new FileReader();
              reader.onloadend = () => resolve(reader.result as string);
              reader.onerror = reject;
  
              if (resizedBlob) {
                reader.readAsDataURL(resizedBlob);
              } else {
                reject('No se pudo redimensionar la imagen.');
              }
            }, 'image/png', 0.9); // Ajusta el tipo y calidad si es necesario
          } else {
            reject('No se pudo obtener el contexto del canvas.');
          }
  
          URL.revokeObjectURL(url); // Liberar memoria
        };
  
        img.onerror = reject;
        img.src = url;
      });
    }
  
    imageLoaded(image: LoadedImage) {
      // show cropper
    }
    cropperReady() {
      // cropper ready
    }
    loadImageFailed() {
      // show message
    }
  
    cancelar() {
      this.visible = false;
      this.stateGeneral.cancelarPortada();
    }
  
    guardar() {
      this.ajusteService.guardarPortada(Number(localStorage.getItem('cliente_id')), this.croppedImage).subscribe(resp => {
        console.log('FromBackend', resp);
        this.visible = false;
        this.stateGeneral.savedPortada();
      }, error => {
        console.log('error', error);
        this.visible = false;
        this.stateGeneral.cancelarPortada();
        Swal.fire({ title: 'Error al guardar', text: '', icon: 'warning' });
  
  
      });
    }

}
