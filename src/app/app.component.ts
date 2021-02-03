import { Component } from '@angular/core';

@Component({
  selector: 'my-app',
  templateUrl: './app.component.html',
  styleUrls: [ './app.component.scss' ]
})

export class AppComponent  {
   photos: Object[];
   cameras: Object = {
     'Curiosity': ['FHAZ', 'RHAZ', 'MAST', 'CHEMCAM', 'MAHLI', 'MARDI', 'NAVCAM'],
     'Opportunity': ['FHAZ', 'RHAZ', 'NAVCAM', 'PANCAM', 'MINITES'],
     'Spirit': ['FHAZ', 'RHAZ', 'NAVCAM', 'PANCAM', 'MINITES']
   };
  
  currentRover: string;
  currentCamera: string;
  sol: number = 1000;
  photosCount: number = 6;

  loadMore(){
    this.photosCount += 6;
  }

  showFullImage(p){
    window.open(p['img_src']);
  }

  async getPhotos(){
    if(this.currentRover && this.currentCamera){
      let promise = await fetch(`https://api.nasa.gov/mars-photos/api/v1/rovers/${this.currentRover.toLowerCase()}/photos?sol=${this.sol}&camera=${this.currentCamera.toLowerCase()}&api_key=igzYcA993EHzsWqm4OZKEwIY1zVrCWa0nXGuq0J9`);
      let data = await promise.json();
      this.photos = data['photos'];
      this.photosCount = 6;
    }
  }
}
