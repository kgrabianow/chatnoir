/**
 * Klasa SquareBoard
 *
 * Przechowuje informacje o planszy i jej polach
 *
 * @author Krystian Grabianowski
 *
 */
class SquareBoard {

	/** 
	*	Utworzenie obiektu Planszy
	*
	*	@param	number  $x	 			x początku planszy
	*	@param	number  $y	 			y początku planszy
	*	@param	number  $size	 		rozmiar pojedynczego pola
	*	@param	number  $width 			szerokość planszy
	*	@param	number  $height 		wysokość planszy
	*
	*/
	constructor(x,y,size,width,height){
		this.x = x;
		this.y = y;
		this.size = size;
		this.width = width;
		this.height = height;

		this.createFieldsTab();

		console.log(this);
	}

	/** 
	*	Utworzenie tablicy pól na podstawie wysokości,szerokości i rozmiaru pola
	*
	*/
	createFieldsTab(){
		this.fieldsTab = [];
		for(var i=0; i<this.height/this.size; i++){
			this.fieldsTab[i] = [];
			for(var j=0; j<this.width/this.size; j++){
				this.fieldsTab[i][j] = new SquareField(	this.x+j*this.size,
														this.y+i*this.size,
														this.size,
														j+i*(this.height/this.size),
														'black',
														'grey'
													);
			}			
		}
		return this.fieldsTab;		
	}

	/** 
	*	Rysowanie planszy poprzez wyrysowanie 
	*	każdego z pól w tablicy this.fieldsTab[];
	*
	*	@param	obj	  $ctx 		 		kontekst obiektu canvas
	*	@param	bool  $s	 			czy rysować obramowanie
	*	@param	bool  $f	 			czy rysować wypełnienie
	*	@param	bool  $n	 			czy rysować numer
	*
	*/
	draw(ctx,s,f,n) {
    	for(var i=0; i<this.height/this.size; i++){
    		for(var j=0; j<this.width/this.size; j++){
    			this.fieldsTab[i][j].draw(ctx,s,f,n);
    		}
    	}
	}
}