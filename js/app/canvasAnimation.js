
	var fps = 20;

	var lastTime = 0;

	animationLoop();
	
	function animationLoop(time){
		requestAnimationFrame( animationLoop );
		if(time-lastTime>=1000/fps){

			lastTime = time;

			app.appDom.ctx.fillStyle = 'rgba(255,255,255,1)';
			app.appDom.ctx.fillRect(0,0,app.appDom.my_canvas.width,app.appDom.my_canvas.height);

			app.board.draw(app.appDom.ctx,app.showBorder,app.showFill,app.showNumber);

			app.cat.draw(app.appDom.ctx);

		}
	}