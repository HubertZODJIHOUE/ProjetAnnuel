import {Component, DoCheck, OnInit} from '@angular/core';
import {TrashService} from "../services/trash/trash.service";
import {Dechet} from "../Models/Dechet";

@Component({
  selector: 'app-tri-game',
  templateUrl: './tri-game.component.html',
  styleUrls: ['./tri-game.component.scss']
})
export class TriGameComponent implements  DoCheck,OnInit {

  gold = "../../assets/tri/leaderboard/LeaderBoardMedals_1.png";
  silver = "../../assets/tri/leaderboard/LeaderBoardMedals_2.png";
  bronz = "../../assets/tri/leaderboard/LeaderBoardMedals_3.png";
  leaderboard :any[]=[];
  time: any;
  interval: any;
  playing :any;
  HIGHSCORE :any;
  L1:any; // palier 1
  L2 :any; // palier 2
  L3: any; // palier 3
  L4: any; // palier 4
  score : any;
  trashItem :any;
  public trashs: Dechet[]= []
  constructor(protected trashService: TrashService) {
    this.trashService = trashService;

    // @TODO balancer le user qui se connecte dans lobservable pour pouvoir recuperer son  id et le fetch avec le hightscore '
  }
  ngOnInit() {
    this.HIGHSCORE = 0 // TODO : API.READ(this.HIGHSCORE); == read le highscore du joueur actuel avec l'API recupérer
    this.playing = -1;
    this.trashService.getTrash().subscribe(trash=>{
      this.trashs= trash
      console.table(this.trashs)
      if(this.trashs){
        this.L1 = this.trashs.filter(elem => elem.type <= 3);
        this.L2 = this.trashs.filter(elem => elem.type <= 4);
        this.L3 = this.trashs.filter(elem => elem.type <= 5);
        this.L4 = this.trashs;
      }
    })
  }
  ngDoCheck() {
    if (this.time >= 60){
      this.onGameEnd();
    }
  }
  displayLeaderboard() {
    this.onGameEnd();
    this.leaderboard = [
      {
        compte : "thomas",
        game_name : "tri",
        value : 4
      },
      {
        compte : "thomas2",
        game_name : "tri",
        value : 10
      },
      {
        compte : "thomas3",
        game_name : "tri",
        value : 12
      },
      {
        compte : "thomas12",
        game_name : "tri",
        value : 1
      },
      {
        compte : "thomas4",
        game_name : "tri",
        value : 3
      }
    ];// TODO : API.READ(this.leaderboard); Read tout les highscore au format JSON avec l'API
    this.leaderboard = this.leaderboard.sort(function(a, b) {
      var keyA = a.value,
        keyB = b.value;
      // Compare the 2 dates
      if (keyA > keyB) return -1;
      if (keyA < keyB) return 1;
      return 0;
    });
    this.playing = -2;
  }
  startTimer() {
    this.interval = setInterval(() => {
      if (this.time === 0) {
        this.time++;
      } else {
        this.time++;
      }
    }, 1000);
  }
  displayTimer(): string {
    if (this.time >= 60){
      return '0';
    }
    if (this.time > 50) {
      return '0' + (60-this.time);
    }
    else {
      return '' + (60-this.time);
    }
  }
  randomElementOf(list: string | any[]){
    return list[Math.floor(Math.random()*list.length)];
  }
  pickRandomTrashItem(){
    if (this.score < 12){
      this.trashItem = this.randomElementOf(this.L1);
    }
    else if (this.score < 24){
      this.trashItem = this.randomElementOf(this.L2);
    }
    else if (this.score < 36){
      this.trashItem = this.randomElementOf(this.L3);
    }
    else {
      this.trashItem = this.randomElementOf(this.L4);
    }
  }
  trash(id:number){
    if(this.time >= 60){
      return;
    }
    if (this.trashItem.type == id){
      this.score += 1;
    }
    else {
      this.score -= 1;
    }
    this.pickRandomTrashItem();
  }
  onGameEnd() {
    clearInterval(this.interval);
    if (this.HIGHSCORE != null){
      if (this.score > this.HIGHSCORE){
        // TODO : API.UPDATE(this.HIGHSCORE); Update le highscore du joueur actuel avec l'API
      }
    }
    else {
      // TODO : API.CREATE(this.HIGHSCORE); Create le highscore du joueur actuel avec l'API
    }
    this.playing = 0;
  }

  replay() {
    this.HIGHSCORE = 0 // TODO : API.READ(this.HIGHSCORE); (COMME POUR ONINIT)
    // this.trashService = new(TrashService);
    // this.L1 = this.trashService.getL1();
    // this.L2 = this.trashService.getL2();
    // this.L3 = this.trashService.getL3();
    // this.L4 = this.trashService.getL4();
    this.score = 0;
    this.pickRandomTrashItem();
    this.time = 0;
    this.playing = 1;
    this.startTimer();
  }

}
