function SceneThree () {


	this.clearColor = 0e1416;
	// CAMERA
	var persp = 400
	var distance = 650
	var counter
	var gravityspeed
	var blink = 0
	this.timer = false
	cameraOne = this.camera
	this.camera = new THREE.PerspectiveCamera( 15, window.innerWidth / window.innerHeight, 0.1, 10000 );
	this.camera.position.x = 0;
	this.camera.position.y = persp;
	this.camera.position.z = distance;
	this.camera.lookAt( new THREE.Vector3())



	// Setup scene
	this.scene = new THREE.Scene();
	sceneNumberThree = this.scene
	// LIGHTS
	let lights = {
		 ambient: new THREE.AmbientLight( 0xffffff )
		,directional: new THREE.DirectionalLight( 0xfffff2, 0 )
		,point: new THREE.PointLight( 0xff8755, 1 )
	}
	lights.point.position.set( 135, 200, -200)
	lights.point.castShadow = false
	lights.point.shadowDarkness = 1;
	lights.point.shadowCameraVisible = true;
	//this.scene.add( lights.point );
	this.scene.add( lights.ambient );

	//OBJECT LOADER	
	var dae;
	var dae_geometry;
	var dae_material;
	var loader = new THREE.ColladaLoader();
	loader.options.convertUpAxis = true;
	loader.load( 'scenes/scene3/model/night.dae', function ( collada ) {
		dae = collada.scene;
		for (var i = 0; i < dae.children.length; i++) {
			if (dae.children[i].name != "Camera" && dae.children[i].name != "Light") {
				for (var j = 0; j < dae.children[i].children.length; j++) {
					var mat = dae.children[i].children[j].material;
					mat.transparent = true;
					//mat.depthWrite = false;
				}
			}
			
		}
		dae.scale.x = dae.scale.y = dae.scale.z = .3;
		dae.position.y = -45;
		dae.updateMatrix();
		sceneNumberThree.add( dae );
	
	} );

	// BLINKING
	/*
	setInterval(function(){
		console.log (blink)
		if (blink > 10){
			// BLINK
			blink = 0
			for (var i = 0; i < dae.children.length; i++) {			
				if (dae.children[i].name == "wallL") {
					for (var j = 0; j < dae.children[i].children.length; j++) {
						texture = THREE.ImageUtils.loadTexture('scenes/scene1/model/tex/wallL.jpg')
						material = new THREE.MeshBasicMaterial({map: texture})
						dae.children[i].children[0].material.map = texture;
					}
				}
			}
		} else{
			// NOT BLINK
			blink++
			for (var i = 0; i < dae.children.length; i++) {			
				if (dae.children[i].name == "wallL") {
					for (var j = 0; j < dae.children[i].children.length; j++) {
						texture = THREE.ImageUtils.loadTexture('scenes/scene1/model/tex/wallR.jpg')
						material = new THREE.MeshBasicMaterial({map: texture})
						dae.children[i].children[0].material.map = texture;
					}
				}
			}
		}
		

	}, 800);
	*/

	//SKYBOX	
	/*
	var path = "scenes/scene3/skybox/";
	var format = '.jpg';
	var urls = [
			path + 'night' + format
		];
	var materialArray = [];
	for (var i = 0; i < 6; i++)
		materialArray.push( new THREE.MeshBasicMaterial({
			map: THREE.ImageUtils.loadTexture( urls[0] ),
			side: THREE.BackSide
		}));
	var skyMaterial = new THREE.MeshFaceMaterial( materialArray );
	var reflectionCube = new THREE.CubeTextureLoader().load( urls );
	reflectionCube.format = THREE.RGBFormat;
	var shader = THREE.ShaderLib[ "cube" ];
	shader.uniforms[ "tCube" ].value = reflectionCube;
	var skyboxMesh = new THREE.Mesh( new THREE.BoxGeometry( 1000, 1000, 1000 ), skyMaterial ); 
	sceneNumberThree.add(skyboxMesh); 
	*/
	//

	renderTargetParameters = { minFilter: THREE.LinearFilter, magFilter: THREE.LinearFilter, format: THREE.RGBFormat, stencilBuffer: false };
	this.fbo = new THREE.WebGLRenderTarget( window.innerWidth, window.innerHeight, renderTargetParameters );

    
	this.render = function( delta, rtt ) {

		// SCENE FLOATING
		/*
		skyboxMesh.rotation.x += 0.0001;
		skyboxMesh.rotation.y += 0.0001;
		*/
		this.camera.position.x += ( (mouseX)/20 - this.camera.position.x ) * .1;
		this.camera.position.y += ( (mouseY)/20 - this.camera.position.y + persp ) * .1;
		this.camera.lookAt( new THREE.Vector3())



		renderer.setClearColor( this.clearColor );

		if ( rtt )
			renderer.render( this.scene, this.camera, this.fbo, true );
		else
			renderer.render( this.scene, this.camera );

	};

}