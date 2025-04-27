import { Component, EventEmitter, Input, OnInit, Output, ViewChild } from '@angular/core';
import { ComponentStateService } from '../../../../../shared/services/component-state.service';
import { ImageCroppedEvent, LoadedImage } from 'ngx-image-cropper';
import { DomSanitizer } from '@angular/platform-browser';

type DialogPosition = 'center' | 'top' | 'bottom' | 'left' | 'right' | 'topleft' | 'topright' | 'bottomleft' | 'bottomright';


@Component({
  selector: 'app-crop-image',
  templateUrl: './crop-image.component.html',
  styleUrl: './crop-image.component.css'
})
export class CropImageComponent implements OnInit {
  visible: boolean = false;
  position: DialogPosition = 'top';
  imageChangedEvent: any = '';
  croppedImage: any = '';

  @Output() parentFunctionCrop: EventEmitter<any> = new EventEmitter();

  constructor(
    private componentState: ComponentStateService,
    private sanitizer: DomSanitizer
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
      this.convertBlobToBase64(event.blob).then(base64 => {
        this.croppedImage = base64;
        console.log('Cropped Image as Base64:', this.croppedImage);
      });
    } else {
      console.error('No blob in cropped event');
    }
  }

  convertBlobToBase64(blob: Blob): Promise<string> {
    return new Promise((resolve, reject) => {
      const reader = new FileReader();
      reader.onloadend = () => resolve(reader.result as string);
      reader.onerror = reject;
      reader.readAsDataURL(blob);
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
    this.componentState.hideCrop();
  }

  guardar() {
    if (this.croppedImage) {
      this.parentFunctionCrop.emit(this.croppedImage);
    }
    this.visible = false;
    this.componentState.hideCrop();
  }

}
