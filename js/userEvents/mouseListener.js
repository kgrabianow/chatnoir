/**
 * Klasa MouseListener
 *
 * Przechowuje informacje o położeniu kursora
 *
 * @author Krystian Grabianowski
 *
 */
class MouseListener extends MouseEvent{

	constructor(app){

		super();

		/** 
		*	Obsługa klikniecia na planszy
		*	
		*/
		app.appDom.my_canvas.addEventListener('click', function(event) {

			let clickedHex = app.board.getNumber(this.mouseX,this.mouseY);

			if( app.board.fieldsTab[ clickedHex[0] ][ clickedHex[1] ].isClicked ){
				;
			}else if( 	app.board.fieldsTab[ clickedHex[0] ][ clickedHex[1] ].number != app.cat.number &&
						app.cat.avaible == true ){
				app.board.fieldsTab[ clickedHex[0] ][ clickedHex[1] ].clicked();
				app.cat.jump(app.board);
			}

			// console.log( clickedHex[2] );
			// console.log( app.board.fieldsTab[ clickedHex[0] ][ clickedHex[1] ].neighbours );

		}, false);

		/** 
		*	Obsługa przesuniecia kursora po canvas
		*	Pobiera współrzedne kursora do obiektu
		*	
		*/
		app.appDom.my_canvas.addEventListener('mousemove', function(event) {

			this.mouseX =  -app.appDom.my_canvas.offsetLeft + event.clientX;
			this.mouseY =  -app.appDom.my_canvas.offsetTop + event.clientY;

			let field = app.board.getNumber(this.mouseX,this.mouseY);

			if( field != undefined ){

				// Kolorowanie sasiadów
				// console.log( app.board.fieldsTab[ field[0] ][ field[1] ].neighbours );
				// app.board.colorNeighbours( app.board.fieldsTab[ field[0] ][ field[1] ].neighbours );

				app.appDom.mouse_div.innerHTML = 	"Coordinates: X: " + this.mouseX + 
													" Y: " + this.mouseY + 
													" Field: " + field[2];

				let clickedHex = app.board.getNumber(this.mouseX,this.mouseY);

				if( app.board.fieldsTab[ clickedHex[0] ][ clickedHex[1] ].isClicked ){
					app.appDom.my_canvas.style.cursor = "not-allowed";
				}else if( 	app.board.fieldsTab[ clickedHex[0] ][ clickedHex[1] ].number != app.cat.number &&
							app.cat.avaible == true ){
					app.appDom.my_canvas.style.cursor = "pointer";
				}

			}else{
				app.appDom.mouse_div.innerHTML = 	"Coordinates: X: " + this.mouseX + 
													" Y: " + this.mouseY;			
			}

		}, false);

		/** 
		*	Obsługa klikniecia przycisku New Game
		*	
		*/
		app.appDom.start_button.addEventListener('click', function(event) {
			if( app.cat.avaible == false ){
				app.startNewGame();
			}

		}, false);	

		/** 
		*	Obsługa klikniecia przycisku Show Number
		*	
		*/
		app.appDom.show_number.addEventListener('click', function(event) {
			app.swichShowNumber();

		}, false);				

		/** 
		*	Obsługa klikniecia przycisku Show Fill
		*	
		*/
		app.appDom.show_fill.addEventListener('click', function(event) {
			app.swichShowFill();

		}, false);	
	}

}

