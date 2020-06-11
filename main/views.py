from django.shortcuts import render, redirect
from django.http import HttpResponse
from datetime import datetime
import os
import sys #for getting operating system.
import html
# Create your views here.
def pop(request):
    print('Easter Egg.')
#Some global varibels.
isOsWindows = False
def initFunc():
    if (sys.platform == 'win32'):
        osname = True
    
def index(request):
    initFunc()
    page = 'main/index.html'
    no  = len(os.listdir('./main/static/data/image/'))
    context = {
        'imageTemplateNo': no
    }
    return render(request, page, context)

def encryptMe(title, content, password,image):
    tempfile = open(r'main/static/data/temp.txt','w')
    tempfile.write(content)
    tempfile.close()
    name = title+'.'
    name += str(datetime.now()).replace('-','')
    name = name.replace(' ','_')
    name = name.replace(':','') +'.'+image+ '.jpg'

    #Now running commands depending upon os type.
    if(isOsWindows):
        #if windows [i feel sorry for you!]
        print('to copy -> '+image)
        print('copy as -> '+name)
        os.system(f'copy "main\\static\\data\\image\\img({image}).jpg" "main\\static\\data\\entries\\{name}"')
        os.system(f'steghideforwindows\\steghide  embed -cf main\\static\\data\\entries\\{name} -ef main\\static\\data\\temp.txt -p {password}')
    else:
        #if on linux.
        os.system(f'cp "main/static/data/image/img({image}).jpg" "main/static/data/entries/{name}"')
        os.system(f"""steghide embed -cf main/static/data/entries/{name} -ef main/static/data/temp.txt -p {password}""")
    #now deleting stuff from the txt file.
    tempfile = open(r'main/static/data/temp.txt','w')
    tempfile.write('')
    tempfile.close() #always close your resources.


def writeDiary(request):
    d_title = request.POST['title'].replace(' ','_')
    d_content = request.POST['content']
    d_pass = request.POST['password']
    d_image = request.POST['image']
    encryptMe(d_title,d_content,d_pass,d_image)
    return HttpResponse(status=204)
def deleteDiary(request):
    name = request.POST['toread'].strip()
    if(isOsWindows):
        #windows...
        os.system('del /f main\\static\\data\\entries\\'+name)
    else:
        #linux
        os.system('rm main/static/data/entries/'+name)
    return redirect('main:read')
def getReadContext():
    entryList = []
    if(isOsWindows):
        #windows...
        entryList = os.listdir('main\\static\\data\\entries\\')
    else:
        #linux
        entryList = os.listdir('main/static/data/entries/')
    return entryList

def read(request):
    page = 'main/read.html'
    return render(request, page, {'list':getReadContext()})

def reading(request):
    name = request.POST['toread']
    password = request.POST['pass']
    decodedText = decode(name.strip(),password)
    return HttpResponse(f'<pre>{decodedText}</pre>')

def decode(name,password):
    if(isOsWindows):
        #if windows [i feel sorry for you!]
        # os.system(f'copy data\\{image} data\\entries\\{name}')
        os.system(f'steghideforwindows\\steghide  extract -sf main\\static\\data\\entries\\{name} -xf main\\static\\data\\temp.txt -p {password} -f')
    else:
        #if on linux.
        # os.system(f'cp data/{image} data/entries/{name}')
        os.system(f"""steghide extract -sf 'main/static/data/entries/{name}' -xf 'main/static/data/temp.txt' -p '{password}' -f""")
    
    #now reading text...
    f = open(r'main/static/data/temp.txt','r')
    text = f.read()
    f.close()
    f = open(r'main/static/data/temp.txt','w')
    f.write('')
    f.close()
    return text