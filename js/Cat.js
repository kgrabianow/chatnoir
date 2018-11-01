/**
 * Klasa Cat
 *
 * Przechowuje informacje o obiekcie Kota
 *
 * @author Krystian Grabianowski
 *
 */
class Cat {

	/** 
	*	Utworzenie obiektu Kota
	*
	*	@param	number  $x	 				x środka kota
	*	@param	number  $y	 				y środka pola
	*	@param	number  $size	 			rozmiar kota
	*	@param	number  $number 			numer pola
	*	@param	string  $i 					numer pola
	*	@param	string  $j 					numer pola
	*
	*/
	constructor(x,y,size,number,i,j){
		this.x = parseInt(x);
		this.y = parseInt(y);
		this.size = size;
		this.number = number;

		this.setFill_color("black");

		this.i = i;
		this.j = j;

		this.destination_place = [this.x,this.y];

		this.avaible = true;

		this.img = new Image();
		this.img.src = "img/cat_stay.png";
		this.animationCounter = 0;

		this.winningFields = [	0,1,2,3,4,5,6,7,8,9,10,
								11,12,13,14,15,16,17,18,19,20,
								21,42,83,105,126,147,168,189,
								31,52,73,94,115,136,157,178,199,
								200,201,202,203,204,205,206,207,208,209,
								210,211,212,213,214,215,216,217,218,219,220
							];
	}

	/** 
	*	Ustawia kolor wypełnienia
	*
	*	@param	string  $color 			kolor pola
	*
	*/
	setFill_color(color){
		this.fill_color = color;
	}

	/** 
	*	Wylicza pole przemieszczenia kota
	*
	*	@param	object  $board 			obiekt Planszy
	*
	*/
	jump(board){
		do{
			// Sprawdzenie czy istnieje pole na które można sie przemieścić
			if( this.isNoWay(board.fieldsTab[this.i][this.j].neighbours,board) == true ){
				// nie można uciec - porażka
				this.concede();
				break;
			}

			// przypisanie pola przemieszczenia
			this.destination_field = board.fieldsTab[this.i][this.j].neighbours[ Math.ceil( Math.random()*(board.fieldsTab[this.i][this.j].neighbours.length-1) ) ];

			// Powtarzaj póki nie wylosowano dostepnego - niekliknietego pola
		}while( board.fieldsTab[this.destination_field[1]][this.destination_field[2]].isClicked == true );

		this.move(this.destination_field,board);

		// Sprawdzenie czy znajduje sie na polu wygrywającym
		this.isEscaped(this.destination_field) ? this.escaped() : '';
	}

	/** 
	*	Przemieszczenie do określonego pola
	*
	*	@param	array  	$destination_field 		tablica pola przemieszczenia
	*	@param	object  $board 					obiekt Planszy
	*
	*/
	move(field,board){

		// console.log(field);

		this.destination_place[0] = parseInt(board.fieldsTab[field[1]][field[2]].centerX);
		this.destination_place[1] = parseInt(board.fieldsTab[field[1]][field[2]].centerY);
		this.i = field[1];
		this.j = field[2];

		this.number = field[0];

	}

	/** 
	*	Sprawdzenie czy nie ma wyjścia
	*
	*	@param	array  $array 			tablica sasiadow
	*	@param	object $board 			obiekt Planszy	
	*
	*	@return	bool   $win				określa wygraną/przegraną
	*/
	isNoWay(array,board){
		this.win = true;
		for(var i=0; i<array.length; i++){
			if(board.fieldsTab[ (array[i])[1] ][ (array[i])[2] ].isClicked == false){
				this.win = false;
			} 
		}
		// console.log(this.win);
		return this.win;				
	}

	/** 
	*	Sprawdzenie czy kot uciekł
	*
	*	@param	field  $array 			tablica pola gdzie znalazł sie kot	
	*
	*	@return	bool   $win				określa wygraną/przegraną
	*/
	isEscaped(field){
		this.win = false;
		for(var i=0; i<this.winningFields.length; i++){
			if(this.winningFields[i] == field[0]){
				this.win = true;
			} 
		}
		// console.log(this.win);
		return this.win;				
	}

	/** 
	*	Kot sie poddaje - stwierdzono porażke
	*
	*/
	concede(){
		this.setFill_color("white");
		this.avaible = false;
		app.actualizeScore(true);
		this.isConcede = true;
	}

	/** 
	*	Kot uciekł - stwierdzono zwyciestwo
	*
	*/
	escaped(){
		this.setFill_color("green");
		this.avaible = false;
		app.actualizeScore(false);
		this.isWin = true;
	}

	/** 
	*	Przeliczenie pozycji przy przemieszczaniu
	*
	*/
	calculatePosition(){

		if( parseInt(this.destination_place[0]) != parseInt(this.x) ){
			for(var i=0;i<5;i++){
				if( this.destination_place[0] - this.x < 1 || this.x - this.destination_place[0] < 1 ){
					this.destination_place[0] > this.x ? parseInt(this.x+=1) : parseInt(this.x-=1);
				}
			}
		}

		if( parseInt(this.destination_place[1]) != parseInt(this.y) ){
			for(var i=0;i<5;i++){
				if( this.destination_place[1] - this.y < 1 || this.y - this.destination_place[1] < 1 ){
					this.destination_place[1] > this.y ? parseInt(this.y+=1) : parseInt(this.y-=1);
				}
			}
		}				
	}

	/** 
	*	Podmienia wyświetlany obraz zależnie od przemieszczenia
	*
	*/
	chooseImage(){

		// RightUp
		if( parseInt(this.destination_place[0]) > parseInt(this.x) &&
			parseInt(this.destination_place[1]) < parseInt(this.y) ){
			this.img.src = "img/cat_jump_right_up.png";
		}
		// RightDown
		else if( parseInt(this.destination_place[0]) > parseInt(this.x) &&
			parseInt(this.destination_place[1]) > parseInt(this.y) ){
			this.img.src = "img/cat_jump_right_down.png";
		}
		// Down
		else if( parseInt(this.destination_place[0]) == parseInt(this.x) &&
			parseInt(this.destination_place[1]) > parseInt(this.y) ){
			this.img.src = "img/cat_down.png";
		}
		// Up
		else if( parseInt(this.destination_place[0]) == parseInt(this.x) &&
			parseInt(this.destination_place[1]) < parseInt(this.y) ){
			this.img.src = "img/cat_up.png";
		}
		// LeftDown
		else if( parseInt(this.destination_place[0]) < parseInt(this.x) &&
			parseInt(this.destination_place[1]) > parseInt(this.y) ){
			this.img.src = "img/cat_jump_left_down.png";
		}
		// LeftUp
		else if( parseInt(this.destination_place[0]) < parseInt(this.x) &&
			parseInt(this.destination_place[1]) < parseInt(this.y) ){
			this.img.src = "img/cat_jump_left_up.png";
		}
		// Concede
		else if( this.isConcede == true ){
			this.img.src = "img/cat_concede.png";
		}
		// Wins
		else if( this.isWin == true ){
			this.isVicotry();
		}				
		// Stay
		else{
			this.isStay();
		}

	}

	/** 
	*	Kot uciekł animacja
	*
	*/
	isVicotry(){
		if(this.animationCounter < 5){
			this.img.src = "img/cat_stay.png";
		}else if(this.animationCounter >= 5 && this.animationCounter < 10){
			this.img.src = "img/cat_victory_1.png";
		}else{
			this.img.src = "img/cat_stay.png";
		}
		this.animationCounter++;
		if(this.animationCounter>20){this.animationCounter=0;}
	}

	/** 
	*	Kot stoi w miejscu
	*
	*/
	isStay(){
		if(this.animationCounter < 5){
			this.img.src = "img/cat_stay.png";
		}else if(this.animationCounter >= 5 && this.animationCounter < 10){
			this.img.src = "img/cat_stay_1.png";
		}else{
			this.img.src = "img/cat_stay.png";
		}
		this.animationCounter++;
		if(this.animationCounter>20){this.animationCounter=0;}
	}

	/** 
	*	Rysowanie kota na canvas
	*
	*/
	draw(ctx) {

		// Przelicz pozycje
		this.calculatePosition();

		// Wybierz klatke animacji
		this.chooseImage();

		ctx.beginPath();

		// Obrazek tła
		ctx.drawImage(this.img,this.x-this.img.width/24,this.y-this.img.height/8,this.img.width/6,this.img.height/6);

		// Rezerwowy widok kota
		// ctx.arc(this.x,this.y,this.size,0,2*Math.PI);
		// ctx.fillStyle = this.fill_color;
		// ctx.fill();

		ctx.closePath();
	}

}