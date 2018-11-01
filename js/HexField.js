/**
 * Klasa HexField
 *
 * Przechowuje informacje o pojedynczych polach planszy
 *
 * @author Krystian Grabianowski
 *
 */
class HexField {

	/** 
	*	Utworzenie obiektu Pola
	*
	*	@param	number  $x	 				x początku pola
	*	@param	number  $y	 				y początku pola
	*	@param	number  $size	 			rozmiar pojedynczego pola
	*	@param	number  $number 			numer pola
	*	@param	string  $stroke_color 		kolor pola
	*	@param	string  $fill_color_no 		kolor pola
	*	@param	string  $fill_color_yes 	kolor pola		
	*
	*/
	constructor(x,y,size,number,stroke_color,fill_color_no,fill_color_yes,i,j){
		this.x = x;
		this.y = y;
		this.size = size;
		this.number = number;

		this.setCenterPoint();

		this.setAllPoints();

		this.setPointsArray();

		this.isClicked = false;

		this.stroke_color = stroke_color;
		this.fill_color_no = fill_color_no;
		this.fill_color_yes = fill_color_yes;

		this.setFill_color(this.fill_color_no);

		this.i = i;
		this.j = j;
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
	*	Ustawia środek Hexa
	*
	*/
	setCenterPoint(){
		this.centerX = this.x + this.size/2;
		this.centerY = this.y + this.size/2;
	}

	/** 
	*	Obsługa clikniecia
	*
	*/
	clicked(){
		this.isClicked ? this.isClicked : this.isClicked = !this.isClicked;
		this.isClicked ? this.setFill_color(this.fill_color_yes) : this.setFill_color(this.fill_color_no);
		return this.isClicked;
	}

	/** 
	*	Tworzy punkty Hexa (x1,y1,x2,y2,...,x6,y6)
	*
	*/
	setAllPoints(){
		this.x1 = this.centerX - this.size/4;
		this.y1 = this.centerY + this.size/4 * Math.sqrt(3);

		this.x2 = this.centerX + this.size/4;
		this.y2 = this.centerY + this.size/4 * Math.sqrt(3);

		this.x3 = this.centerX + this.size/2;
		this.y3 = this.centerY;

		this.x4 = this.centerX + this.size/4;
		this.y4 = this.centerY - this.size/4 * Math.sqrt(3);

		this.x5 = this.centerX - this.size/4;
		this.y5 = this.centerY - this.size/4 * Math.sqrt(3);

		this.x6 = this.centerX - this.size/2;
		this.y6 = this.centerY;
	}

	/** 
	*	Tworzy tablice z punktami
	*
	*/
	setPointsArray(){
		this.polyCorners = 6;
		this.polyX = [this.x1,this.x2,this.x3,this.x4,this.x5,this.x6];
		this.polyY = [this.y1,this.y2,this.y3,this.y4,this.y5,this.y6];
	}

	/** 
	*	Ustawia pola sąsiednie
	*
	*	@param	array  $array	 		tablica numerów sasiadów
	*
	*/
	setNeighbours(array){
		this.neighbours = array;
	}

	/** 
	*	Zwraca numer pola
	*
	*	@param	number  $x	 			x początku pola
	*	@param	number  $y	 			y początku pola
	*
	*	@return	bool    $oddNodes		jeśli x,y w obszarze zwraca true
	*
	*/
	getNumber(x,y){

 		let j = this.polyCorners-1;
  		let oddNodes = false;

		for (let i=0; i<this.polyCorners; i++) {
		    if ((this.polyY[i]< y && this.polyY[j]>=y
		    ||   this.polyY[j]< y && this.polyY[i]>=y)
		    &&  (this.polyX[i]<=x || this.polyX[j]<=x)) {
		      if (this.polyX[i]+(y-this.polyY[i])/(this.polyY[j]-this.polyY[i])*(this.polyX[j]-this.polyX[i])<x) {
		        oddNodes=!oddNodes; }}
		j=i; }

		return oddNodes;

	}

	/** 
	*	Rysowanie pola na canvas
	*	@param	obj	  $ctx 		 		kontekst obiektu canvas
	*	@param	bool  $s	 			czy rysować obramowanie
	*	@param	bool  $f	 			czy rysować wypełnienie
	*	@param	bool  $n	 			czy rysować numer
	*
	*/
	draw(ctx,s,f,n) {
		ctx.beginPath();

		ctx.lineTo(this.x1, this.y1);
		ctx.lineTo(this.x2, this.y2);

		ctx.lineTo(this.x3, this.y3);
		ctx.lineTo(this.x4, this.y4);

		ctx.lineTo(this.x5, this.y5);
		ctx.lineTo(this.x6, this.y6);

		ctx.lineTo(this.x1, this.y1);
		
		// ctx.lineTo(this.x + this.size/2 - this.size/4, this.y + this.size/2 + this.size/4 * Math.sqrt(3));
		// ctx.lineTo(this.x + this.size/2, this.y + this.size/2);

		// rysowanie obramowania
		ctx.strokeStyle = this.stroke_color;
		s ? ctx.stroke() : '';

		// rysowanie wypełnienia
		ctx.fillStyle = this.fill_color;
		f ? ctx.fill() : '';

		// rysowanie numeru pola
		n ? this.drawNumber(ctx) : '';

		ctx.closePath();
	}

	/** 
	*	Rysowanie numeru pola na canvas
	*
	*/
	drawNumber(ctx){
		ctx.fillStyle = 'black';
		ctx.font = "10px Arial";
		ctx.fillText(this.number,this.x + this.size/3,this.y + this.size/2);		
	}
}