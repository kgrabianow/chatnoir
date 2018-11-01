/**
 * Klasa Run
 *
 * Odpowiada za rozruch aplikacji
 *
 * @author Krystian Grabianowski
 *
 */
class Run {

	constructor(){
		// Assets
		this.asset = new Assets();
		// DOM
		this.appDom = new CreateDOM(830,510);
		// Mouse
		this.mouse = new MouseListener(this);
		// Board
		this.board = new HexBoard(15,15,50,550,550);
		this.board.randomBlock(15,this.board);
		// Cat
		this.cat = new Cat(	this.board.fieldsTab[10][5].centerX,
							this.board.fieldsTab[10][5].centerY,
							15,
							110,
							10,
							5
						);

		this.currentGame = 1;
		this.wins = 0;
		this.lose = 0;

		this.showBorder = true;
		this.showFill = true;
		this.showNumber = false;

		this.showGameParameters();

	}

	showGameParameters(){
		this.appDom.currentGame.innerHTML = "Current game: " + "<span>" + this.currentGame + "</span>";
		this.appDom.wins.innerHTML = " Wins: " + "<span>" + this.wins + "</span>";
		this.appDom.loses.innerHTML = " Loses: " + "<span>" + this.lose + "</span>";
	}

	actualizeScore(score){
		score ? this.wins++ : this.lose++;
		this.showGameParameters();
		this.appDom.start_button.classList.remove("unavaible_div");
		this.appDom.start_button.classList.add("avaible_div");
	}

	swichShowNumber(){
		this.showNumber = !this.showNumber;
		this.showNumber ? this.appDom.show_number.innerHTML = "Hide Numbers" : this.appDom.show_number.innerHTML = "Show Numbers";
	}

	swichShowFill(){
		this.showFill = !this.showFill;
		this.showFill ? this.appDom.show_fill.innerHTML = "Hide Fill" : this.appDom.show_fill.innerHTML = "Show Fill";
	}

	startNewGame(){
		this.currentGame++;
		this.showGameParameters();

		this.appDom.start_button.classList.remove("avaible_div");
		this.appDom.start_button.classList.add("unavaible_div");		

		// Odśwież plansze i wylosuj pola
		this.board.clearFields();
		this.board.randomBlock(15,this.board);
		// Odśwież kota
		this.cat.x = this.board.fieldsTab[10][5].centerX;
		this.cat.y = this.board.fieldsTab[10][5].centerY;
		this.cat.destination_place = [this.cat.x,this.cat.y];
		this.cat.isConcede = false;
		this.cat.isWin = false;
		this.cat.number = 110;
		this.cat.i = 10;
		this.cat.j = 5;
		this.cat.avaible = true;
	}

}

var app = new Run();
