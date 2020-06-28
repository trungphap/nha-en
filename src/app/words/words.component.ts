import { WordService } from './../word.service';
import { Component, OnInit } from '@angular/core';
import { Word } from '../models/word';


@Component({
  selector: 'app-words',
  templateUrl: './words.component.html',
  styleUrls: ['./words.component.css']
})
export class WordsComponent implements OnInit {

  words:Word[];
  selectedWord:Word;
  editMode:number=0;

  getWords(): void {
    this.wordService.getWords().subscribe(words=>this.words=words);
  }

  onSelect(word:Word): void {
    this.selectedWord=word;   
    this.editMode=this.editMode+2;
  }

  constructor(private wordService: WordService) { }

  ngOnInit(): void {
    this.getWords();
  }

}
