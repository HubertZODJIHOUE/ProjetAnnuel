import {Component, OnInit} from '@angular/core';
import {HttpClient} from "@angular/common/http";
import {Route, Router} from "@angular/router";
import {SimulationServiceService} from "../services/simulation/simulation-service.service";
import {DomSanitizer, SafeUrl} from "@angular/platform-browser";

@Component({
  selector: 'app-liste-signalement',
  templateUrl: './liste-signalement.component.html',
  styleUrls: ['./liste-signalement.component.scss']
})
export class ListeSignalementComponent implements  OnInit{
  signalements: any;
  imageUrl=''
  constructor(private  http:HttpClient, private router:Router,private signaService : SimulationServiceService,private sanitizer: DomSanitizer) {
  }

  ngOnInit(): void {
    this.signaService.getSignalemnet().subscribe(res=>{
      this.signalements= res
      if(this.signalements){
        const byteArray = new Uint8Array(this.signalements[0].image);
        const blob = new Blob([byteArray]);




      }


    })
  }

  convertArrayBufferToString(buffer: ArrayBuffer): string {
    const decoder = new TextDecoder('utf-8');
    return decoder.decode(buffer);
  }

  convertStringToArrayBuffer(str: string): ArrayBuffer {
    const encoder = new TextEncoder();
    return encoder.encode(str).buffer;
  }
  getSafeImageDataUrl(imageData: number[]): SafeUrl {
    const imageBlob = new Blob([new Uint8Array(imageData)], { type: 'image/jpeg' }); // Assurez-vous de spécifier le type d'image correct ici

    const imageUrl = URL.createObjectURL(imageBlob);
    return this.sanitizer.bypassSecurityTrustUrl(imageUrl);
  }


}
