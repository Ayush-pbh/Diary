document.querySelector('#saveEncrypt').addEventListener('click',() =>{
    var passwordInput = prompt("Please Enter a good password!\n(Leave blank for master password)");
    submitForm(passwordInput);
});
document.querySelector('#saveNotEncrypt').addEventListener('click',() =>{
    submitForm('90def%88');
});
document.querySelector('#addCustomImage').addEventListener('click',() =>{
    toggleFileInput();
});
var selectedImage = -1
function submitForm(password){
    if(document.querySelector('#title').value.trim() != ''){
        if(password==''){password='90def%88';}
        document.querySelector('#password').value = password;
        if(selectedImage==-1){alert('Select a image first');return false;}
        document.querySelector('#image').value = selectedImage;
        document.querySelector('#form').submit();
    }
    else{
        alert('Sorry but, Title cannot be empty!');
    }
}
FileInputVisibe = false
function toggleFileInput(){
    f = document.querySelector('#customImage');
    if(!FileInputVisibe){
        //showing FileInput...
        f.classList.remove('hidden');
        FileInputVisibe = !FileInputVisibe;
    }
    else{
        f.classList.add('hidden');
        FileInputVisibe = !FileInputVisibe;
    }
}
function displayImagePreview() {
    f = document.querySelector('#customImage');
    console.log(f.value);
    pre = document.querySelector('#imagepreview');
    pre.innerHTML = "<img src='"+f.value+"'>";
}

function ImagepreviewInit(){
    var pre = document.querySelector('#imagepreview'),temp='';
    for(var i=0;i<imageTemplateNo;i++){
        temp+='<img class="tempimg" onclick="imgClicked('+(i+1)+')" src="'+staticfolder+'data/image/img('+(i+10)+').jpg">';
        
    }
    pre.innerHTML = temp;
}
function imgClicked(no) {
    selectedImage = 9+no;
    var pre = document.getElementsByClassName('tempimg');
    for (var index = 0; index<pre.length; index++) {
        pre[index].classList.remove('selected');
    }
    pre[(no-1)].classList.add('selected');
}
window.onload = ImagepreviewInit();