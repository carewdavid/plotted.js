

window.onload = function() {
const canvas = document.getElementById('can');
const ctx = canvas.getContext('2d');
const S = new Plotted.SVG(100, 100, ctx);
const Point = Plotted.Point;
console.log(S);
let start = new Plotted.Point(0, 0);
let end = new Plotted.Point(100, 100);
S.line(start, end);
let corner = start.add(10);
const R = new Plotted.Rect(corner, 40, 40).fill('none').stroke('red');
S.addChild(R)




let randomPoints = [];
for(let i = 0; i < 5; i++){
	randomPoints.push(new Point(Math.random() * 100, Math.random() * 100))
}
let longLine = new Plotted.Path(randomPoints).strokeWidth(2).fill('none').stroke('black');
S.addChild(longLine);




S.setGroup('overstuff');
S.fill('orange');
S.rect(corner.add(20), 40, 40).stroke('black');

S.setGroup("more stuff")
S.rect(corner.add(10), 40, 40).fill('none').stroke('blue');

let path = S.path(S.origin);
path.lineTo(S.center.add(new Point(-10, 0))).stroke('black').fill('none');
path.addAttribute('id', 'testpath');

S.circle(S.center, S.width * .5).stroke('orange').fill('none');

S.draw();
window.drawing = S;
}

window.onkeyup = (event) =>{
    if(event.key == 's'){
        downloadSVG();
    }else if(event.key == 'p'){
        downloadPNG();
    }
}

function downloadSVG(){
	const text = window.drawing.exportSVG({asString: true});
	const fileName = `test.svg`;
	const blob = new Blob([text], {type: 'image/svg+xml'});
	let elem = document.createElement('a');
	elem.href = window.URL.createObjectURL(blob);
	elem.setAttribute('download', fileName);
	document.body.appendChild(elem);
	elem.click();
	document.body.removeChild(elem);
}

function downloadPNG(){

	const canvas = document.getElementById("can");
	const fileName = `test.png`;
	const blob = canvas.toBlob((blob) => {
	    let elem = document.createElement('a');
	    elem.href = window.URL.createObjectURL(blob);
	    elem.setAttribute('download', fileName);
	    document.body.appendChild(elem);
	    elem.click();
	    document.body.removeChild(elem);
    });
}