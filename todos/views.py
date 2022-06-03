from django.shortcuts import render, redirect

from todos.models import TodoDiary

todo_num = 0

# Create your views here.
def todo(request):
    return render(request, 'todos/todo.html')

def new(request):
    return render(request, 'todos/new.html')

def create(request):
    todo_data = {}
    global todo_num
    todo_num = int(request.GET.get('todo_num'))

    for i in range(todo_num):
        str_num = str(i)
        str_hidden_num = str_num + 'hidden'
        str_name = 'todo' + str_num
        check_name = 'check' + str_num

        if request.GET.get(check_name) == '1':
            todo_data[str_hidden_num] = request.GET.get(str_name)
        else:
            todo_data[str_num] = request.GET.get(str_name)

    content = request.GET.get('content')

    diary = TodoDiary(todos=todo_data, content=content)
    diary.save()
    return redirect('todos:index')

def index(request):
    diarys = TodoDiary.objects.order_by('-pk')
    check = []
    for i in range(todo_num):
        name = str(i) + 'hidden'
        check.append(name)
        
    context = {
        'diarys': diarys,
        'check': check,
    }
    return render(request, 'todos/index.html', context)

def delete(request, pk):
    diary = TodoDiary.objects.get(pk=pk)
    diary.delete()

    return redirect('todos:index')



