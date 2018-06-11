function SceneDay () {

	this.clearColor = 0x0e1416;
	// CAMERA
	var persp = 400
	var distance = 650
	var counter
	var gravityspeed
	var timer = false
	cameraTwo = this.camera
	this.camera = new THREE.PerspectiveCamera( 15, window.innerWidth / window.innerHeight, 0.1, 10000 );
	this.camera.position.x = 0;
	this.camera.position.y = persp;
	this.camera.position.z = distance;
	this.camera.lookAt( new THREE.Vector3())



	// Setup scene
	this.scene = new THREE.Scene();
	sceneTwo = this.scene
	// LIGHTS
	let lights = {
		 ambient: new THREE.AmbientLight( 0xffffff )
		,directional: new THREE.DirectionalLight( 0xfffff2, 0 )
		,point: new THREE.PointLight( 0xff8755, 1 )
	}
	lights.point.position.set( 135, 200, -200)
	lights.point.castShadow = true
	lights.point.shadowDarkness = 1;
	lights.point.shadowCameraVisible = true;
	//this.scene.add( lights.point );
	this.scene.add( lights.ambient );

	//OBJECT LOADER
	
	var dae;
	var dae_material;
	var loader = new THREE.ColladaLoader();
	loader.options.convertUpAxis = true;
	loader.load( 'rooms/room1/day.dae', function ( collada ) {
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
		dae.position.x = navigation.value + navigation.spacing
		dae.updateMatrix();
		sceneTwo.add( dae );
	
	} );

	//OBJECT LOADER
	
	var dae2;
	var dae_material;
	var loader = new THREE.ColladaLoader();
	loader.options.convertUpAxis = true;
	loader.load( 'rooms/room2/day.dae', function ( collada ) {
		dae2 = collada.scene;
		for (var i = 0; i < dae2.children.length; i++) {
			if (dae2.children[i].name != "Camera" && dae2.children[i].name != "Light") {
				for (var j = 0; j < dae2.children[i].children.length; j++) {
					var mat = dae2.children[i].children[j].material;
					mat.transparent = true;
					//mat.depthWrite = false;
				}
			}
		}
		dae2.scale.x = dae2.scale.y = dae2.scale.z = .3;
		dae2.position.x = navigation.value + (navigation.spacing *2);
		dae2.position.y = -45;
		dae2.updateMatrix();
		sceneTwo.add( dae2 );
	
	} );

	//OBJECT LOADER
	
	var dae3;
	var loader = new THREE.ColladaLoader();
	loader.options.convertUpAxis = true;
	loader.load( 'rooms/room3/day.dae', function ( collada ) {
		dae3 = collada.scene;
		for (var i = 0; i < dae3.children.length; i++) {
			if (dae3.children[i].name != "Camera" && dae3.children[i].name != "Light") {
				for (var j = 0; j < dae3.children[i].children.length; j++) {
					var mat = dae3.children[i].children[j].material;
					mat.transparent = true;
					//mat.depthWrite = false;
				}
			}
		}
		dae3.scale.x = dae3.scale.y = dae3.scale.z = .3;
		dae3.position.x = navigation.value + (navigation.spacing *3);
		dae3.position.y = -45;
		dae3.updateMatrix();
		sceneTwo.add( dae3 );
	
	} );

	//OBJECT LOADER
	
	var dae4;
	var loader = new THREE.ColladaLoader();
	loader.options.convertUpAxis = true;
	loader.load( 'rooms/room4/day.dae', function ( collada ) {
		dae4 = collada.scene;
		for (var i = 0; i < dae4.children.length; i++) {
			if (dae4.children[i].name != "Camera" && dae4.children[i].name != "Light") {
				for (var j = 0; j < dae4.children[i].children.length; j++) {
					var mat = dae4.children[i].children[j].material;
					mat.transparent = true;
					//mat.depthWrite = false;
				}
			}
		}
		dae4.scale.x = dae4.scale.y = dae4.scale.z = .3;
		dae4.position.x = navigation.value + (navigation.spacing *3);
		dae4.position.y = -45;
		dae4.updateMatrix();
		sceneTwo.add( dae4 );
	
	} );


	

	renderTargetParameters = { minFilter: THREE.LinearFilter, magFilter: THREE.LinearFilter, format: THREE.RGBFormat, stencilBuffer: false };
	this.fbo = new THREE.WebGLRenderTarget( window.innerWidth, window.innerHeight, renderTargetParameters );


	// LOAD
	THREE.DefaultLoadingManager.onProgress = function ( item, loaded, total ) {
    console.log( item, loaded, total );
    if (loaded >= total){
    	console.log("SCENE LOADED");
    }
	};

	this.render = function( delta, rtt ) {

		dae.position.x = navigation.value + navigation.spacing;
		dae2.position.x = navigation.value + (navigation.spacing *2);
		dae3.position.x = navigation.value + (navigation.spacing *3);
		dae4.position.x = navigation.value + (navigation.spacing *4);
		globalCameraPositionX += ( (mouseX)/30 - globalCameraPositionX ) * .1;
		globalCameraPositionY += ( (mouseY)/30 - globalCameraPositionY + persp ) * .1;
		this.camera.position.x = globalCameraPositionX
		this.camera.position.y = globalCameraPositionY
		this.camera.lookAt( new THREE.Vector3())



		renderer.setClearColor( this.clearColor );

		if ( rtt )
			renderer.render( this.scene, this.camera, this.fbo, true );
		else
			renderer.render( this.scene, this.camera );

	};

}
