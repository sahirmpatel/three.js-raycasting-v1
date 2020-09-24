import * as THREE from './three.js-master/build/three.module.js';

function main() {
    document.getElementById('popup').style.display = "none"
    const canvas = document.querySelector('#c');
    const renderer = new THREE.WebGLRenderer({ canvas });


    const scene = new THREE.Scene();
    scene.background = new THREE.Color('white');

    const fov = 60;
    const aspect = 2;  // the canvas default
    const near = 0.1;
    const far = 200;
    const camera = new THREE.PerspectiveCamera(fov, aspect, near, far);
    camera.position.z = 5;

    // put the camera on a pole (parent it to an object)
    // so we can spin the pole to move the camera around the scene
    const cameraPole = new THREE.Object3D();
    scene.add(cameraPole);
    cameraPole.add(camera);


    const boxWidth = 1;
    const boxHeight = 1;
    const boxDepth = 1;
    const geometry = new THREE.BoxGeometry(boxWidth, boxHeight, boxDepth);
    const material = new THREE.MeshPhongMaterial({ color: 0x44aa88 });

    const cube = new THREE.Mesh(geometry, material);


    {
        const color = 0xFFFFFF;
        const intensity = 1;
        const light = new THREE.DirectionalLight(color, intensity);
        light.position.set(-1, 2, 4);
        camera.add(light);
    }


    //three cubes
    function makeInstance(geometry, color, x) {
        const material = new THREE.MeshPhongMaterial({ color });

        const cube = new THREE.Mesh(geometry, material);
        scene.add(cube);

        cube.position.x = x;

        return cube;
    }

    const cubes = [
        makeInstance(geometry, 0x44aa88, 0),
        makeInstance(geometry, 0x8844aa, -2),
        makeInstance(geometry, 0xaa8844, 2),
    ];

    //add cone
    // var conegeometry = new THREE.ConeGeometry(5, 5, 12);
    // var conematerial = new THREE.MeshBasicMaterial({ color: 0xffff00 });
    // var cone = new THREE.Mesh(conegeometry, conematerial);
    // cone.position.set(0, 10, -11)
    // scene.add(cone);



    //canvas size check
    function resizeRendererToDisplaySize(renderer) {
        const canvas = renderer.domElement;
        const pixelRatio = window.devicePixelRatio;
        const width = canvas.clientWidth * pixelRatio | 0;
        const height = canvas.clientHeight * pixelRatio | 0;
        const needResize = canvas.width !== width || canvas.height !== height;
        if (needResize) {
            renderer.setSize(width, height, false);
        }
        return needResize;
    }


    // raycaster2
    var raycaster = new THREE.Raycaster();
    var mouse = new THREE.Vector2();

    function onMouseDown(event) {
        mouse.x = (event.clientX / window.innerWidth) * 2 - 1;
        mouse.y = - (event.clientY / window.innerHeight) * 2 + 1;
        // update the picking ray with the camera and mouse position
        raycaster.setFromCamera(mouse, camera);
        // calculate objects intersecting the picking ray
        // console.log(scene.children);
        var intersects = raycaster.intersectObjects(scene.children);
        // console.log(intersects.length);
        for (var i = 0; i < intersects.length; i++) {
            // console.log(intersects[i].object.uuid)


            switch (intersects[i].object.uuid) {
                case scene.children[1].uuid:
                    console.log('Second Box id Clicked');
                    if (document.getElementById('popup').style.display == "none") {
                        document.getElementById('popup').style.display = "inline"
                    }
                    document.getElementById('popup').innerText = "Second box is clicked"
                    break;
                case scene.children[2].uuid:
                    console.log('First Box id Clicked');
                    if (document.getElementById('popup').style.display == "none") {
                        document.getElementById('popup').style.display = "inline"
                    }
                    document.getElementById('popup').innerText = "First box is clicked"
                    break;
                case scene.children[3].uuid:
                    console.log('Third box id clicked!');
                    if (document.getElementById('popup').style.display == "none") {
                        document.getElementById('popup').style.display = "inline"
                    }
                    document.getElementById('popup').innerText = "Third box is clicked"
                    // expected output: "Mangoes and papayas are $2.79 a pound."
                    break;
                default:
                    console.log(`Sorry, `);
            }




        }

        // if (document.getElementById('popup').style.display == "inline") {
        //     document.getElementById('popup').style.display = "none"
        // }
    }

    window.addEventListener('mousedown', onMouseDown, false);



    //render function
    function render(time) {
        time *= 0.001;  // convert time to seconds

        if (resizeRendererToDisplaySize(renderer)) {
            const canvas = renderer.domElement;
            camera.aspect = canvas.clientWidth / canvas.clientHeight;
            camera.updateProjectionMatrix();
        }

        cubes.forEach((cube, ndx) => {
            const speed = 1 + ndx * .1;
            const rot = time * speed;
            cube.rotation.x = rot;
            cube.rotation.y = rot;
        });
        // cameraPole.rotation.y = time * .1;
        renderer.render(scene, camera);
        requestAnimationFrame(render);
    }
    requestAnimationFrame(render);

}
main()