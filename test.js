

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
S.rect(corner, 20, 20).fill('green')


let path = S.path();
path.moveTo(start);
path.lineTo(new Point(100, 10));
path.curveTo(S.center, end);

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