/**
 * Klasa SquareField
 *
 * Przechowuje informacje o pojedynczych polach planszy
 *
 * @author Krystian Grabianowski
 *
 */
class SquareField {

	/** 
	*	Utworzenie obiektu Pola
	*
	*	@param	number  $x	 			x początku pola
	*	@param	number  $y	 			y początku pola
	*	@param	number  $size	 		rozmiar pojedynczego pola
	*	@param	number  $number 		numer pola
	*	@param	string  $color 			kolor pola
	*
	*/
	constructor(x,y,size,number,stroke_color,fill_color){
		this.x = x;
		this.y = y;
		this.size = size;
		this.number = number;

		this.stroke_color = stroke_color;
		this.fill_color = fill_color;
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

		ctx.moveTo(this.x,this.y);
		ctx.lineTo(this.x+this.size,this.y);
		ctx.lineTo(this.x+this.size,this.y+this.size);
		ctx.lineTo(this.x,this.y+this.size);
		ctx.lineTo(this.x,this.y);

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