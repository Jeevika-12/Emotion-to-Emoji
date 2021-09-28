Webcam.set({
    width: 350,
    height: 300,
    image_format: 'png',
    png_quality: 90
});
camera = document.getElementById("camera");
Webcam.attach(camera);

console.log('ml5 version:', ml5.version);

function take_snapshot() {
    Webcam.snap(function(data_uri) {
        document.getElementById("result").innerHTML = '<img id="captured_img" src="' + data_uri + '"/>';
    });

}
classifier = ml5.imageClassifier('https://teachablemachine.withgoogle.com/models/wSYQDO1Mn/model.json', modelLoaded);

function modelLoaded() {
    console.log('Model Loaded~');
}
prediction_1 = "";
prediction_2 = "";

function speak() {
    var synth = window.speechSynthesis;
    speak_data_1 = "The first prediction is " + prediction_1;
    speak_data_2 = "The second prediction is " + prediction_2;
    var utterThis = new SpeechSynthesisUtterance(speak_data_1 + speak_data_2);
    synth.speak(utterThis);
}

function check() {
    img = document.getElementById('captured_img');
    classifier.classify(img, gotResult);
}

function gotResult(error, results) {
    if (error) {
        console.log(error);
    } else {
        console.log(results);
        document.getElementById("result_emotion_name1").innerHTML = results[0].label;
        document.getElementById("result_emotion_name2").innerHTML = results[1].label;
        prediction_1 = results[0].label;
        prediction_2 = results[1].label;
        speak();
        if (results[0].label == "happy") {
            document.getElementById("update_emoji1").innerHTML = "&#128522;";
        } else if (results[0].label == "sad") {
            document.getElementById("update_emoji1").innerHTML = "&#128532;";
        } else if (results[0].label == "crying") {
            document.getElementById("update_emoji1").innerHTML = "&#128546;";
        } else if (results[0].label == "angry") {
            document.getElementById("update_emoji1").innerHTML = "&#128545;";
        }
        if (results[1].label == "happy") {
            document.getElementById("update_emoji2").innerHTML = "&#128522;";
        } else if (results[1].label == "sad") {
            document.getElementById("update_emoji2").innerHTML = "&#128532;";
        } else if (results[1].label == "crying") {
            document.getElementById("update_emoji2").innerHTML = "&#128546;";
        } else if (results[1].label == "angry") {
            document.getElementById("update_emoji2").innerHTML = "&#128545;";
        }
    }
}