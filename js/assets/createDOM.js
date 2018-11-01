/**
 * Klasa CreateDOM
 *
 * Tworzy i wstawia obiekt canvas i pochodne
 *
 * @author Krystian Grabianowski
 *
 */
class CreateDOM {

	/** 
	*	Utworzenie i wstawienie canvas do diva "content"
	*
	*	@param	number  $width 			szerokość canvas
	*	@param	number  $height 		wysokość canvas
	*
	*/
	constructor(width,height){
		this.destination_div = document.getElementById("content");

		// Title
		this.page_title = document.createElement('h3');
		this.page_title.id = "title";
		this.page_title.innerText = "Chat Noir Game in JS and Canvas HTML5";
		this.destination_div.appendChild(this.page_title);

		// Description
		this.description_field = document.createElement('div');
		this.description_field.id = "description_field";
		this.destination_div.appendChild(this.description_field);

		// Start Button
		this.start_button = document.createElement('div');
		this.start_button.classList.add("description_div");
		this.start_button.classList.add("unavaible_div");
		this.start_button.id = "start_button";
		this.start_button.innerHTML = "New Game";
		this.description_field.appendChild(this.start_button);

		// Show Number
		this.show_number = document.createElement('div');
		this.show_number.classList.add("description_div");
		this.show_number.classList.add("button_div");
		this.show_number.id = "show_number";
		this.show_number.innerHTML = "Show Numbers";
		this.description_field.appendChild(this.show_number);

		// Show Number
		this.show_fill = document.createElement('div');
		this.show_fill.classList.add("description_div");
		this.show_fill.classList.add("button_div");
		this.show_fill.id = "show_fill";
		this.show_fill.innerHTML = "Hide Fill";
		this.description_field.appendChild(this.show_fill);

		// Current Game
		this.currentGame = document.createElement('div');
		this.currentGame.classList.add("description_div");
		this.currentGame.id = "currentGame";
		this.description_field.appendChild(this.currentGame);

		// Wins
		this.wins = document.createElement('div');
		this.wins.classList.add("description_div");
		this.wins.id = "wins";
		this.description_field.appendChild(this.wins);

		// Loses
		this.loses = document.createElement('div');
		this.loses.classList.add("description_div");
		this.loses.id = "loses";		
		this.description_field.appendChild(this.loses);	

		// Canvas Div
		this.canvas_div = document.createElement('div');
		this.canvas_div.id = "canvas_div";
		this.destination_div.appendChild(this.canvas_div);

		// Canvas
		this.my_canvas = document.createElement('canvas');
		this.my_canvas.width = width;
		this.my_canvas.height = height;
		this.canvas_div.appendChild(this.my_canvas);
		this.ctx = this.my_canvas.getContext('2d');

		// Mouse Info
		this.mouse_div = document.createElement('div');
		this.mouse_div.id = "mouse_div";
		this.destination_div.appendChild(this.mouse_div);
	}

}