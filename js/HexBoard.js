/**
 * Klasa HexBoard
 *
 * Przechowuje informacje o planszy i jej polach
 *
 * @author Krystian Grabianowski
 *
 */
class HexBoard {

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

        this.arrayRow = [];
        this.arrayColumn = [];

		this.createFieldsTab();

		this.setNeighbourFields();

		console.log(this);
	}

	/** 
	*	Zwraca numer pola
	*
	*	@param	number  $x	 			x początku pola
	*	@param	number  $y	 			y początku pola
	*
	*	@return	number  $number			numer pola
	*
	*/
	getNumber(x,y){
		let currentField = '';
    	for(var i=0; i<(this.height/this.size)*2-1; i++){
    		for(var j=0; (i%2==0) ? j<(this.width/this.size) : j<(this.width/this.size)-1; j++){
    			currentField = this.fieldsTab[i][j].getNumber(x,y);
    			if(currentField != false){
    				let response = [i,j,this.fieldsTab[i][j].number];
    				return response;
    			}
    		}
    	}
	}

	/** 
	*	Utworzenie tablicy pól na podstawie wysokości,szerokości i rozmiaru pola
	*
	*/
	createFieldsTab(){
		this.fieldsTab = [];
		let k = 0;
		for(var i=0; i<(this.height/this.size)*2-1; i++){
			this.fieldsTab[i] = [];
            this.arrayRow.push(i);
			for(var j=0; (i%2==0) ? j<(this.width/this.size) : j<(this.width/this.size)-1; j++){
				this.arrayColumn.length < (this.width/this.size)-1 ? this.arrayColumn.push(j) : '';
                this.fieldsTab[i][j] = new HexField(	(i%2==0) ? this.x+j*this.size  + j*this.size/2 : this.x+j*this.size + this.size*3/4 + j*this.size/2,
														this.y+i*(this.size/4 * Math.sqrt(3)),
														this.size,
														k,
														// j+i*(this.height/this.size),
														'black',
														'grey',
														'yellow',
														i,
														j
													);
				k++;
			}			
		}
		return this.fieldsTab;		
	}

	/** 
	*	Przypisuje sasiadów dla Pola
	*
	*/
	setNeighbourFields(){
		let k = 0;
    	for(var i=0; i<(this.height/this.size)*2-1; i++){
    		for(var j=0; (i%2==0) ? j<(this.width/this.size) : j<(this.width/this.size)-1; j++){
    			if(i%2==0 && i!=0 && j!=0){
    			this.fieldsTab[i][j].setNeighbours([	[this.fieldsTab[i][j].number + 21,		i+2,	j],
    													[this.fieldsTab[i][j].number - 21,		i-2,	j],
    													[this.fieldsTab[i][j].number + 11,		i+1,	j],
    													[this.fieldsTab[i][j].number - 11,		i-1,	j-1],
     													[this.fieldsTab[i][j].number + 11 - 1,	i+1,	j-1],
    													[this.fieldsTab[i][j].number - 11 + 1,	i-1,	j]     													   													
    												]);
    			}
    			if(i%2==1 && i!=1){
    			this.fieldsTab[i][j].setNeighbours([	[this.fieldsTab[i][j].number + 21,		i+2,	j],
    													[this.fieldsTab[i][j].number - 21,		i-2,	j],
    													[this.fieldsTab[i][j].number + 11,		i+1,	j+1],
    													[this.fieldsTab[i][j].number - 11,		i-1,	j],
     													[this.fieldsTab[i][j].number + 11 - 1,	i+1,	j],
    													[this.fieldsTab[i][j].number - 10,		i-1,	j+1]     													   													
    												]);
    			}
    			if(k%21==0 && k!=0 && k!=210){
    			this.fieldsTab[i][j].setNeighbours([	[this.fieldsTab[i][j].number + 21,		i+2,	j],
    													[this.fieldsTab[i][j].number - 21,		i-2,	j],
    													[this.fieldsTab[i][j].number + 11,		i+1,	j],
    													[this.fieldsTab[i][j].number - 10,		i-1,	j]    													   													
    												]);
    			}
    			if(
    				k==31 || k==52 || k==73 ||
    				k==94 || k==115 || k==136 ||
    				k==157 || k==178 || k==199
    			){
    			this.fieldsTab[i][j].setNeighbours([	[this.fieldsTab[i][j].number + 21,		i+2,	j],
    													[this.fieldsTab[i][j].number - 21,		i-2,	j],
    													[this.fieldsTab[i][j].number + 10,		i+1,	j-1],
    													[this.fieldsTab[i][j].number - 11,		i-1,	j-1]    													   													
    												]);
    			}
    			if(
    				k==11 || k==12 || k==13 ||
    				k==14 || k==15 || k==16 ||
    				k==17 || k==18 || k==19 || k==20
    			){
    			this.fieldsTab[i][j].setNeighbours([	[this.fieldsTab[i][j].number + 11,		i+1,	j+1],
    													[this.fieldsTab[i][j].number + 10,		i+1,	j],
    													[this.fieldsTab[i][j].number - 11,		i-1,	j],
    													[this.fieldsTab[i][j].number - 10,		i-1,	j+1],		
    													[this.fieldsTab[i][j].number + 21,		i+2,	j]
    												]);
    			}			
    			if(
    				k==200 || k==201 || k==202 ||
    				k==203 || k==204 || k==205 ||
    				k==206 || k==207 || k==208 || k==209
    			){
    			this.fieldsTab[i][j].setNeighbours([	[this.fieldsTab[i][j].number + 11,		i+1,	j+1],
    													[this.fieldsTab[i][j].number + 10,		i+1,	j],
    													[this.fieldsTab[i][j].number - 11,		i-1,	j],
    													[this.fieldsTab[i][j].number - 10,		i-1,	j+1],
    													[this.fieldsTab[i][j].number - 21,		i-2,	j]    													   													
    												]);
    			}
    			if(
    				k==1 || k==2 || k==3 ||
    				k==4 || k==5 || k==6 ||
    				k==7 || k==8 || k==9
    			){
    			this.fieldsTab[i][j].setNeighbours([	[this.fieldsTab[i][j].number + 10,		i+1,	j-1],
    													[this.fieldsTab[i][j].number + 21,		i+2,	j],
    													[this.fieldsTab[i][j].number + 11,		i+1,	j]    													   													
    												]);
    			}    			
    			if(
    				k==211 || k==212 || k==213 ||
    				k==214 || k==215 || k==216 ||
    				k==217 || k==218 || k==219
    			){
    			this.fieldsTab[i][j].setNeighbours([	[this.fieldsTab[i][j].number - 10,		i-1,	j-1],
    													[this.fieldsTab[i][j].number - 21,		i-2,	j],
    													[this.fieldsTab[i][j].number - 11,		i-1,	j]    													   													
    												]);
    			}
    			if(k==0){
    			this.fieldsTab[i][j].setNeighbours([	[this.fieldsTab[i][j].number + 11,		i+1,	j],
    													[this.fieldsTab[i][j].number + 21,		i+2,	j]    													   													
    												]);
    			} 
    			if(k==10){
    			this.fieldsTab[i][j].setNeighbours([	[this.fieldsTab[i][j].number + 10,		i+1,	j-1],
    													[this.fieldsTab[i][j].number + 21,		i+2,	j]    													   													
    												]);
    			} 
    			if(k==210){
    			this.fieldsTab[i][j].setNeighbours([	[this.fieldsTab[i][j].number - 10,		i-1,	j],
    													[this.fieldsTab[i][j].number - 21,		i-2,	j]    													   													
    												]);
    			} 
    			if(k==220){
    			this.fieldsTab[i][j].setNeighbours([	[this.fieldsTab[i][j].number - 11,		i-1,	j-1],
    													[this.fieldsTab[i][j].number - 21,		i-2,	j]    													   													
    												]);
    			} 

    			k++;  			   			
    		}
    	}

	}

    /** 
    *   Losuje określoną ilość pól i oznacza jako klikniete
    *
    */
    colorNeighbours(array){
        for(var i=0; i<(this.height/this.size)*2-1; i++){
            for(var j=0; (i%2==0) ? j<(this.width/this.size) : j<(this.width/this.size)-1; j++){
                this.fieldsTab[i][j].fill_color = "gray";
            }
        }       
        for(var i=0; i<array.length; i++){
            this.fieldsTab[ array[i][1] ][ array[i][2] ].fill_color = "red";
        }
    }

    /** 
    *   Odznacza wszystkie klikniete pola
    *
    */
    clearFields(){

        for(var i=0; i<(this.height/this.size)*2-1; i++){
            for(var j=0; (i%2==0) ? j<(this.width/this.size) : j<(this.width/this.size)-1; j++){
                this.fieldsTab[i][j].isClicked = false;
                this.fieldsTab[i][j].setFill_color(this.fieldsTab[i][j].fill_color_no);
            }           
        }

    }

	/** 
	*	Koloruje sąsiadów
    *   @param  int   $fields              ilość pól do wylosowania
	*
	*/
	randomBlock(fields,board){

        for(var a=0; a<fields; a++){
            do{
                this.rowToBlock     = this.arrayRow[ Math.ceil( Math.random()*( this.arrayRow.length-1 ) ) ];
                this.columnToBlock  = this.arrayColumn[ Math.ceil( Math.random()*( this.arrayColumn.length-1 ) ) ];

                // Powtarzaj póki nie wylosowano dostepnego - niekliknietego pola
            }while( board.fieldsTab[this.rowToBlock][this.columnToBlock].isClicked == true );

            board.fieldsTab[this.rowToBlock][this.columnToBlock].clicked();
        }

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
    	for(var i=0; i<(this.height/this.size)*2-1; i++){
    		for(var j=0; (i%2==0) ? j<(this.width/this.size) : j<(this.width/this.size)-1; j++){
    			this.fieldsTab[i][j].draw(ctx,s,f,n);
    		}
    	}
	}
}