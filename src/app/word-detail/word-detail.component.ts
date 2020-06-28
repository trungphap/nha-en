import { Word } from './../models/word';
import { Component, OnInit, Input } from '@angular/core';
import { WordService } from './../word.service';

@Component({
  selector: 'app-word-detail',
  templateUrl: './word-detail.component.html',
  styleUrls: ['./word-detail.component.css']
})
export class WordDetailComponent implements OnInit {

  @Input() word: Word;
  @Input() editMode:number;
  @Input() wordId:number;

  constructor(private wordService: WordService) {  }

  ngOnInit(): void {
  }

  onEdit() : void{
    this.editMode++;
  }
  onSave() : void{
    this.editMode++;  
    this.wordService.updateWord(this.word).subscribe(a=>console.log(a));
  }
  getEditMode() : boolean {
    if(this.editMode % 2 ==0) return false;
    else return true;
  }


}
