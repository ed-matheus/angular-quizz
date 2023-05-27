import { Component, OnInit } from '@angular/core';
import quizz_questions from '../../../assets/data/quizz_questions.json'

@Component({
  selector: 'app-quiz',
  templateUrl: './quiz.component.html',
  styleUrls: ['./quiz.component.css']
})

export class QuizComponent implements OnInit {

  title:string = ''

  questions:any
  questionSelected:any

  answers:string[] = []
  answerSelected:string = ''
  extraText:string = ''

  questionIndex:number = 0
  questionMaxIndex:number = 0

  finished:boolean = false
  show:boolean = true
  showExtraText:boolean = false

  constructor() { }

  ngOnInit(): void {
    if(quizz_questions){
      this.finished = false
      this.title = quizz_questions.title

      this.questions = quizz_questions.questions
      this.questionSelected = this.questions[this.questionIndex]

      this.questionIndex = 0
      this.questionMaxIndex = this.questions.length
    }
  }

  playerChoice(valor:string) {
    this.answers.push(valor)
    this.nextStep()
  }

  async nextStep() {
    this.questionIndex += 1

    if(this.questionMaxIndex > this.questionIndex) {
      this.questionSelected = this.questions[this.questionIndex]
    }else{
      const finalAnswer:string = await this.checkResult(this.answers)
      this.finished = true
      this.answerSelected = quizz_questions.results[finalAnswer as keyof typeof quizz_questions.results]
      this.extraText = quizz_questions.extraTexts[finalAnswer as keyof typeof quizz_questions.extraTexts]
    }
  }

  async checkResult(answers:string[]) {
    const result = answers.reduce((previous, current, i, arr) => {
      if(
        arr.filter(item => item === previous).length >
        arr.filter(item => item === previous).length
      ) {
        return previous
      } else {
        return current
      }
    })

    return result
  }

  // começa o quiz
  startQuiz() {
    this.show = false
  }

  showText() {
    if(this.showExtraText == false) {
      this.showExtraText = true;
      const text:any = document.getElementById('text')
      text.innerHTML = 'Ver menos <i class="fa-solid fa-caret-up"></i>'

    } else {
      this.showExtraText = false;

      const text:any = document.getElementById('text')
      text.innerHTML = 'Ver mais <i class="fa-solid fa-caret-down"></i>'
    }
  }

  // recomeça o quiz quando o usuário chega no final e aperta o botão "Refazer"
  restart() {
    location.reload();
  }
}
