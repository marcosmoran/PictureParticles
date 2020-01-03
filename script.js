const canvas = document.getElementById("canvas1");
const ctx = canvas.getContext('2d');
canvas.width = window.innerWidth;
canvas.height = window.innerHeight;
let particleArray = [];


// mouse

let mouse = {
    x: null,
    y: null,
    radius: 100
}

window.addEventListener('mousemove',
       function(event){
            mouse.x = event.x;
           mouse.y = event.y;

                    
});

function drawImage(){
    let imageWidth = png.width;
    let imageHeight = png.height;
    const data = ctx.getImageData(0,0, imageWidth, imageHeight);
    ctx.clearRect(0,0,canvas.width, canvas.height);


class Particle{
    constructor(x, y, color, size){
        this.x = x + canvas.width/2 - png.width *2,
        this.y = y + canvas.height/2 - png.height *2,
        this.color = color,
        this.size = 2,
        this.baseX = x + canvas.width/2 - png.width *2,  
        this.baseY = y + canvas.height/2 - png.height *2,
        this.density = (Math.random() * 10) + 2;   
    }

  draw() {
      ctx.beginPath();
      ctx.arc(this.x, this.y, this.size, 0,Math.PI * 2);
      ctx.closePath();
      ctx.fill();
  }

update() {
    ctx.fillStyle= this.color;
    
    //collision detection
    
    let dx = mouse.x - this.x;
    let dy = mouse.y - this.y;
    let distance = Math.sqrt(dx * dx + dy * dy); 
    let forceDirectionX = dx / distance;
    let forceDirectionY = dy / distance;
    
    //max distance, past that the force will be 0
    const maxDistance = 100;
    let force = (maxDistance - distance)/ maxDistance;
    if (force < 0) force = 0;
    
    let directionX = (forceDirectionX * force * this.density * 0.6);
    let directionY = (forceDirectionY * force * this.density * 0.6);
    
    if (distance < mouse.radius + this.size){
        this.x -= directionX;
        this.y -= directionY;
        //console.log("COLLITON");
        
    } else {
        if(this.x !== this.baseX){
            let dx = this.x - this.baseX;
            this.x -= dx/20;
            
        } if(this.y !== this.baseY){
            let dy = this.y - this.baseY;
            this.y -= dy/20;
                }
            }
            this.draw();
        }

    }
    function init() {
        particleArray= [];
        
        for(let y = 0, y2 = data.height; y < y2; y++){
            for (let x= 0, x2 = data.width; x < x2; x++){
                 if (data.data[(y * 4 * data.width) + (x * 4) + 3] > 128) {
                     let positionX = x;
                     let positionY = y;
                     let color = "rgb(" + data.data[(y * 4 * data.width) + (x * 4)] + "," + 
                                          data.data[(y * 4 * data.width) + (x * 4) + 1] + "," +    
                                          data.data[(y * 4 * data.width) + (x * 4) + 2] + ")";
                     particleArray.push(new Particle(positionX * 4 , positionY * 4, color));
                 }
            
            }
        }}
    function animate(){
     
        requestAnimationFrame(animate);
        ctx.fillStyle = 'rgba(0,0,0,.05)';
        ctx.fillRect(0, 0, innerWidth, innerHeight);
        
        for (let i = 0; i < particleArray.length; i++){
            particleArray[i].update();
        }
        }
    
    init();
    animate();
    
    window.addEventListener('resize',
            function(){
                canvas.width = innerWidth;
                canvas.height = innerHeight;
                init();
    })
}

const png = new Image();
png.src = "data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAASwAAAAoCAYAAABEm8fXAAAACXBIWXMAAAsTAAALEwEAmpwYAAAK5GlUWHRYTUw6Y29tLmFkb2JlLnhtcAAAAAAAPD94cGFja2V0IGJlZ2luPSLvu78iIGlkPSJXNU0wTXBDZWhpSHpyZVN6TlRjemtjOWQiPz4gPHg6eG1wbWV0YSB4bWxuczp4PSJhZG9iZTpuczptZXRhLyIgeDp4bXB0az0iQWRvYmUgWE1QIENvcmUgNS42LWMxNDUgNzkuMTYzNDk5LCAyMDE4LzA4LzEzLTE2OjQwOjIyICAgICAgICAiPiA8cmRmOlJERiB4bWxuczpyZGY9Imh0dHA6Ly93d3cudzMub3JnLzE5OTkvMDIvMjItcmRmLXN5bnRheC1ucyMiPiA8cmRmOkRlc2NyaXB0aW9uIHJkZjphYm91dD0iIiB4bWxuczp4bXA9Imh0dHA6Ly9ucy5hZG9iZS5jb20veGFwLzEuMC8iIHhtbG5zOmRjPSJodHRwOi8vcHVybC5vcmcvZGMvZWxlbWVudHMvMS4xLyIgeG1sbnM6cGhvdG9zaG9wPSJodHRwOi8vbnMuYWRvYmUuY29tL3Bob3Rvc2hvcC8xLjAvIiB4bWxuczp4bXBNTT0iaHR0cDovL25zLmFkb2JlLmNvbS94YXAvMS4wL21tLyIgeG1sbnM6c3RFdnQ9Imh0dHA6Ly9ucy5hZG9iZS5jb20veGFwLzEuMC9zVHlwZS9SZXNvdXJjZUV2ZW50IyIgeG1sbnM6c3RSZWY9Imh0dHA6Ly9ucy5hZG9iZS5jb20veGFwLzEuMC9zVHlwZS9SZXNvdXJjZVJlZiMiIHhtbG5zOnRpZmY9Imh0dHA6Ly9ucy5hZG9iZS5jb20vdGlmZi8xLjAvIiB4bWxuczpleGlmPSJodHRwOi8vbnMuYWRvYmUuY29tL2V4aWYvMS4wLyIgeG1wOkNyZWF0b3JUb29sPSJBZG9iZSBQaG90b3Nob3AgQ0MgMjAxOSAoV2luZG93cykiIHhtcDpDcmVhdGVEYXRlPSIyMDE5LTExLTE0VDE2OjE1OjA2WiIgeG1wOk1vZGlmeURhdGU9IjIwMTktMTItMDJUMTQ6NTg6MjJaIiB4bXA6TWV0YWRhdGFEYXRlPSIyMDE5LTEyLTAyVDE0OjU4OjIyWiIgZGM6Zm9ybWF0PSJpbWFnZS9wbmciIHBob3Rvc2hvcDpDb2xvck1vZGU9IjMiIHhtcE1NOkluc3RhbmNlSUQ9InhtcC5paWQ6ZmRkN2JlMDAtMDExNS02ZDRmLWI1ZGEtMmZjODI2ZmEyMGVlIiB4bXBNTTpEb2N1bWVudElEPSJhZG9iZTpkb2NpZDpwaG90b3Nob3A6MDkyOTNhZDUtODQ5Yi01YTQ0LTg2OGQtNTIzOWRiYzA2Y2JlIiB4bXBNTTpPcmlnaW5hbERvY3VtZW50SUQ9InhtcC5kaWQ6NjE1ZjU5ZTItNzM2OC05YTQ2LTk1MzUtOWI3NTE1YTRhZjMwIiB0aWZmOk9yaWVudGF0aW9uPSIxIiB0aWZmOlhSZXNvbHV0aW9uPSI3MjAwMDAvMTAwMDAiIHRpZmY6WVJlc29sdXRpb249IjcyMDAwMC8xMDAwMCIgdGlmZjpSZXNvbHV0aW9uVW5pdD0iMiIgZXhpZjpDb2xvclNwYWNlPSI2NTUzNSIgZXhpZjpQaXhlbFhEaW1lbnNpb249IjIwMCIgZXhpZjpQaXhlbFlEaW1lbnNpb249IjQwIj4gPHBob3Rvc2hvcDpUZXh0TGF5ZXJzPiA8cmRmOkJhZz4gPHJkZjpsaSBwaG90b3Nob3A6TGF5ZXJOYW1lPSJNYXJjb3MgTW9yYW4iIHBob3Rvc2hvcDpMYXllclRleHQ9Ik1hcmNvcyBNb3JhbiIvPiA8L3JkZjpCYWc+IDwvcGhvdG9zaG9wOlRleHRMYXllcnM+IDx4bXBNTTpIaXN0b3J5PiA8cmRmOlNlcT4gPHJkZjpsaSBzdEV2dDphY3Rpb249ImNyZWF0ZWQiIHN0RXZ0Omluc3RhbmNlSUQ9InhtcC5paWQ6NjE1ZjU5ZTItNzM2OC05YTQ2LTk1MzUtOWI3NTE1YTRhZjMwIiBzdEV2dDp3aGVuPSIyMDE5LTExLTE0VDE2OjE1OjA2WiIgc3RFdnQ6c29mdHdhcmVBZ2VudD0iQWRvYmUgUGhvdG9zaG9wIENDIDIwMTkgKFdpbmRvd3MpIi8+IDxyZGY6bGkgc3RFdnQ6YWN0aW9uPSJzYXZlZCIgc3RFdnQ6aW5zdGFuY2VJRD0ieG1wLmlpZDpmMjNjNGY0ZS02ODNkLWI0NDQtYjdlNy02ZDlkNmJhMTg2YjIiIHN0RXZ0OndoZW49IjIwMTktMTEtMjZUMTU6NTQ6NDBaIiBzdEV2dDpzb2Z0d2FyZUFnZW50PSJBZG9iZSBQaG90b3Nob3AgQ0MgMjAxOSAoV2luZG93cykiIHN0RXZ0OmNoYW5nZWQ9Ii8iLz4gPHJkZjpsaSBzdEV2dDphY3Rpb249InNhdmVkIiBzdEV2dDppbnN0YW5jZUlEPSJ4bXAuaWlkOjQ3NWJiOGY4LWVhMDQtM2M0Zi05ZjdiLTEzZDg4NmI5MDY3MiIgc3RFdnQ6d2hlbj0iMjAxOS0xMi0wMlQxNDo1ODoyMloiIHN0RXZ0OnNvZnR3YXJlQWdlbnQ9IkFkb2JlIFBob3Rvc2hvcCBDQyAyMDE5IChXaW5kb3dzKSIgc3RFdnQ6Y2hhbmdlZD0iLyIvPiA8cmRmOmxpIHN0RXZ0OmFjdGlvbj0iY29udmVydGVkIiBzdEV2dDpwYXJhbWV0ZXJzPSJmcm9tIGFwcGxpY2F0aW9uL3ZuZC5hZG9iZS5waG90b3Nob3AgdG8gaW1hZ2UvcG5nIi8+IDxyZGY6bGkgc3RFdnQ6YWN0aW9uPSJkZXJpdmVkIiBzdEV2dDpwYXJhbWV0ZXJzPSJjb252ZXJ0ZWQgZnJvbSBhcHBsaWNhdGlvbi92bmQuYWRvYmUucGhvdG9zaG9wIHRvIGltYWdlL3BuZyIvPiA8cmRmOmxpIHN0RXZ0OmFjdGlvbj0ic2F2ZWQiIHN0RXZ0Omluc3RhbmNlSUQ9InhtcC5paWQ6ZmRkN2JlMDAtMDExNS02ZDRmLWI1ZGEtMmZjODI2ZmEyMGVlIiBzdEV2dDp3aGVuPSIyMDE5LTEyLTAyVDE0OjU4OjIyWiIgc3RFdnQ6c29mdHdhcmVBZ2VudD0iQWRvYmUgUGhvdG9zaG9wIENDIDIwMTkgKFdpbmRvd3MpIiBzdEV2dDpjaGFuZ2VkPSIvIi8+IDwvcmRmOlNlcT4gPC94bXBNTTpIaXN0b3J5PiA8eG1wTU06RGVyaXZlZEZyb20gc3RSZWY6aW5zdGFuY2VJRD0ieG1wLmlpZDo0NzViYjhmOC1lYTA0LTNjNGYtOWY3Yi0xM2Q4ODZiOTA2NzIiIHN0UmVmOmRvY3VtZW50SUQ9InhtcC5kaWQ6NjE1ZjU5ZTItNzM2OC05YTQ2LTk1MzUt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";

window.addEventListener('load', (event) => {
    console.log('loaded');
    ctx.drawImage(png, 0, 0);
    drawImage();
})
