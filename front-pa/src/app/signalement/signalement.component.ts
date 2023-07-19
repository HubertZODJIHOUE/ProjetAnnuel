import {Component, ElementRef, OnInit, ViewChild} from '@angular/core';
import {FormBuilder, FormGroup, Validators} from "@angular/forms";
import {Signalement} from "../Models/Signalement";
import {LoginService} from "../services/login/login.service";
import {HttpClient, HttpHeaders} from "@angular/common/http";

@Component({
  selector: 'app-signalement',
  templateUrl: './signalement.component.html',
  styleUrls: ['./signalement.component.scss']
})
export class SignalementComponent implements  OnInit {

  mediaStream: MediaStream | null = null;
  videoElement: HTMLVideoElement | null = null;
  @ViewChild('canvas') canvasRef!: ElementRef<HTMLCanvasElement>;
  createSignalement!: FormGroup;
  selectedOption: number =0
  imaz: string= ""
  si: Signalement | undefined= undefined
  public localUrl = 'http://localhost:3000/'

  constructor( private fb: FormBuilder, private  loginservice :LoginService, private http:HttpClient) {
  }

  ngOnInit(): void {
    this.createSignalement=this.fb.group({
      date_signalement: ['', Validators.required],
      typeDechet: ['',Validators.required],
      localisation: ['',Validators.required],
      description: ['',Validators.required],
      status_id: ['',Validators.required],
      image: ['',Validators.required],
    })
  }



  validerSignelement() {
    const signelement : Signalement={
      utilisateur_id: 1,
      date_signalement: new Date(),
      type_dechet_id: this.createSignalement.get('typeDechet')?.value,
      localisation: this.createSignalement.get('localisation')?.value,
      description: this.createSignalement.get('description')?.value,
      status_id: 1,
      image:   this.convertStringToArrayBuffer(this.imaz)
    }
    const headers = new HttpHeaders({
      'Authorization': `Bearer ${localStorage.getItem('token')}`
    });
    console.log( headers)

    this.http.post(this.localUrl+ 'signalement', signelement).subscribe(
      response => {
        console.log( response)
      },
      error => {
        // Gérer l'erreur
      }
    );
    console.log("je passe dans le signelement")


    // const signalement2 :Signalement={
    //
    //
    //     utilisateur_id: 1,
    //
    //     type_dechet_id: 1,
    //
    //     localisation: "qsdqsdis",
    //
    //     description: "Un déchet a été trouvé à cet endroit.",
    //
    //     status_id: 1,
    //
    //     image: this.convertStringToArrayBuffer(this.imaz)
    //
    //
    // }
    // this.si= signelement
    this.loginservice.postSignalement(signelement).subscribe(res=>{console.log("@@@@@@@@",res)})
  }
  convertArrayBufferToString(buffer: ArrayBuffer): string {
    const decoder = new TextDecoder('utf-8');
    return decoder.decode(buffer);
  }

  convertStringToArrayBuffer(str: string): ArrayBuffer {
    const encoder = new TextEncoder();
    return encoder.encode(str).buffer;
  }




  capturePhoto() {
    navigator.mediaDevices.getUserMedia({ video: true })
      .then((stream: MediaStream) => {
        this.mediaStream = stream;
        this.videoElement = document.createElement('video');
        this.videoElement.srcObject = stream;
        this.videoElement.play();
      })
      .catch((error) => {
        console.error('Erreur lors de l\'accès à la caméra : ', error);
      });
  }

  // takeSnapshot() {
  //   const canvas = this.canvasRef.nativeElement;
  //   const context = canvas.getContext('2d');
  //   if (context && this.videoElement) {
  //     context.drawImage(this.videoElement, 0, 0, canvas.width, canvas.height);
  //     const imageDataURL = canvas.toDataURL('image/jpeg');
  //     const byteString = atob(imageDataURL.split(',')[1]);
  //     const ab = new ArrayBuffer(byteString.length);
  //     const ia = new Uint8Array(ab);
  //     for (let i = 0; i < byteString.length; i++) {
  //       ia[i] = byteString.charCodeAt(i);
  //     }
  //     const blob = new Blob([ab], { type: 'image/jpeg' });
  //     const file = new File([blob], 'image.jpg');
  //     this.createSignalement.patchValue({
  //       image: file
  //     });
  //   }
  // }

  // takeSnapshot() {
  //   const canvas = this.canvasRef.nativeElement;
  //   const context = canvas.getContext('2d');
  //   if (context && this.videoElement) {
  //     context.drawImage(this.videoElement, 0, 0, canvas.width, canvas.height);
  //     const imageDataURL = canvas.toDataURL('image/jpeg');
  //     this.imaz=imageDataURL;
  //     // this.createSignalement.patchValue({
  //     //   image: imageDataURL,
  //     // });
  //     this.createSignalement.get('image')?.setValue(this.imaz)
  //   }
  //   // console.log(canvas.toDataURL('image/jpeg'))
  //   // console.log("ghertht")
  //   // console.log("z")
  //   // console.log(this.createSignalement?.get('image')?.value)
  //   // this.imaz=canvas.toDataURL('image/jpeg');
  //   // console.log(this.imaz)
  // }

  takeSnapshot() {
    const canvas = this.canvasRef.nativeElement;
    const context = canvas.getContext('2d');
    if (context && this.videoElement) {
      context.drawImage(this.videoElement, 0, 0, canvas.width, canvas.height);
      const imageDataURL = canvas.toDataURL('image/jpeg');
      this.imaz = imageDataURL;
      this.createSignalement.patchValue({
        image: this.imaz
      });
    }
  }


  onImageChange(event: any) {
    if (event.target.files && event.target.files.length) {
      const file = event.target.files[0];
      const imageURL = URL.createObjectURL(file);
      this.createSignalement.patchValue({
        image: imageURL
      });
    }
  }




  // onImageChange(event: any) {
  //   if (event.target.files && event.target.files.length) {
  //     const file = event.target.files[0];
  //     this.createSignalement.patchValue({
  //       image: file
  //     });
  //   }
  // }

  // Other component code

}
