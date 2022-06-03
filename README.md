# To-Do-List Diary

노마드코더에서 [바닐라 JS로 크롬 앱 만들기](https://nomadcoders.co/javascript-for-beginners/lobby)의 강의를 듣고, 배운 기능들을 활용하여 간단하게 나만의 웹페이지를 만들어보자 한다. 3월달에 싸피에서 배운 `django`의 기능도 같이 이용해보면서 복습도 겸함!!

배운 투두리스트 기능을 어떻게 이용할 지 고민하던 중, 평소 다이어리에 오늘 해야할 일을 적고, 그날 밤 해치운 투두리스트를 보며 일기를 쓰는 습관이 떠올랐고, 이것을 그대로 웹페이지로 구현해보고자 하였다!!

<br/>

### 개발 기간

📅2022.03.17 ~ 2022.03.18

<br/>

### 홈페이지 사진 

![윤경1](https://camo.githubusercontent.com/98fd043cf0081860309b61afd0f63c7c36f69c85d0ec444db05a9a3448f6a3c3/68747470733a2f2f7062732e7477696d672e636f6d2f6d656469612f464f4d5379775a615141515045426d3f666f726d61743d6a7067266e616d653d6c61726765)

![윤경2](https://camo.githubusercontent.com/5391f0049e839612ed81f14a86a2d25e814cf6a6deb0dc47111c3238287b78d8/68747470733a2f2f7062732e7477696d672e636f6d2f6d656469612f464f4d5462686d6149414153774d363f666f726d61743d706e67266e616d653d6d656469756d)

![윤경3](https://camo.githubusercontent.com/80f7a5caddb33a92ab3273a60a5ac89fd3fdfe957256518fe1beb6b83a798039/68747470733a2f2f7062732e7477696d672e636f6d2f6d656469612f464f4d5462683561554149705f6f4d3f666f726d61743d706e67266e616d653d6d656469756d)

<br/>

### 어려웠던 점과 해결 방법

- 투두리스트를 만들 때, 완료했다는 표시를 위해 체크 버튼을 추가하였고, 보다 명확하게 보이기 위해서, 체크버튼을 눌렀을 경우 글자에 취소선도 더하고자 했다. 클릭 이벤트를 얻으면 체크버튼을  🔲에서 ✔로 바꾸고, 글자에 취소선 style을 적용하였으나, 새로고침 시 변경사항이 저장이 되지 않는 문제가 발생했다.

  -  `localStorage`에 저장되는 toDos배열의 원소인 newToDoObj는 text와 id밖에 가지고 있지 않아 생기는 문제였고, newToDoObj에 상태를 나타내줄 check값을 추가하면서 해결하였다. 클릭 이벤트를 얻으면, check값도 1로 업데이트해주었고, 이 check값에 따라 태그의 상태가 변화하도록 하였다.

  ```javascript
    const newToDoObj = {
      "text": newToDo,
      "id": Date.now(),
      "check": 0,
    };
  ```



- diary 작성화면에서 작성 버튼을 누르면 투두리스트의 값과, 내가 작성한 다이어리의 값을 DB에 저장하여야 했는데, 투두리스트의 값들을 어떻게 form태그 안에 넣어줘야 할 지 고민이 되었다.....
  - 아직 투두리스트의 값들이 `localStorage`에 저장되어 있으므로, 이 데이터를 value값으로 가지는, input태그를 생성하여 form태그 안에 넣어주는 방식으로 해결하였다. 다른 해결방법은 없을까..? 생각해보기..



- 만들어진 투두리스트의 개수는 미리 지정된 값이 아니므로 DB의 table을 어떻게 구성해야 투두리스트를 저장할 수 있을지 고민함..

  - 모델 필드 중에 `JSONField`가 있다는 것을 알게 되었고, 각 투두리스트를 딕셔너리의 형태로 저장해서 넣어보기로 했다!!

    ```python
    class TodoDiary(models.Model):
        todos = models.JSONField(default=dict)
        content = models.TextField()
        created_at = models.DateTimeField(auto_now_add=True)
    ```

    위처럼 모델을 구성한 뒤, view함수에서 투두리스트의 개수만큼 for문을 돌려 값을 넣고자 하였고, 개수의 값을 view함수에서 얻을 수 있도록, 데이터 전송 시 투두리스트의 개수를 value로 가진 hidden타입의 input을 `new.html`의 form태그 내부에 생성시킴으로써 해결하였다..

    ```javascript
    function handleSubmit(event) {
      const input = document.createElement("input")
      input.type = "hidden"
      input.name = "todo_num"
      input.id = "todo_num"
      input.value = toDos.length;
      toDoList.appendChild(input);
    }
    ```



- 저장된 DB값을 읽어서  `index.html`에서 불러올 때, 완료된 투두리스트는 취소선이 적용되어 있어야 하지만, DB에 저장되는 값은 투두리스트의 text값 뿐이고, 완료 상태를 따로 가지고 있지 못했다!!!!

  - 처음에는 `JSONField`를 사용하여 key값으로는 각 투두리스트의  key값과 동일한 값을 가지고 value값으로는는 투두리스트의  check상태를 저장하는 모델필드를 추가해서 해결하려 했지만, html내부에서 dictionary를 사용하려 할 때 변수의 값을 key로 넣어줄 수 없어서 폐기하였다.

  - 두번째로는 `new.html`에  투두리스트의 개수만큼 각 투두리스트의 완료 상태를 value로 가진 hidden타입의 input을 추가하여 form태그 내에 들어가도록 하였다.. 

    ```javascript
    function paintToDo(newToDoObj, index) {
      const li = document.createElement("li");
      li.id = newToDoObj.id;
    
      const input = document.createElement("input");
      const check_input = document.createElement("input");
    
      input.type = "text";
      const idx = String(index);
      input.name = `todo${idx}`;
      input.id = `todo${idx}`;
      input.value = newToDoObj.text;
      input.readOnly = true;
    
      check_input.type = "hidden"
      check_input.name = `check${idx}`
      check_input.id = `check${idx}`
      check_input.value = 0
    
      if (newToDoObj.check) {
        input.classList.add("done");
        check_input.value = 1;
      }
    
      li.appendChild(input);
      li.appendChild(check_input);
      toDoList.appendChild(li);
      console.log(check_input)
    }
    ```

    이렇게 전송한 데이터를 이용해서 같은 `todo{idx}`와 같은 idx를 가진 `check{idx}`의 값이 '1'을 가지고 있다면, 딕셔너리 key값의 네이밍을 기존의 이름에 'hidden'을 추가해서 만들어주었다.. 

    ```python
    for i in range(todo_num):
        str_num = str(i)
        str_hidden_num = str_num + 'hidden'
        str_name = 'todo' + str_num
        check_name = 'check' + str_num
    
        if request.GET.get(check_name) == '1':
            todo_data[str_hidden_num] = request.GET.get(str_name)
        else:
            todo_data[str_num] = request.GET.get(str_name)
    ```

    그리고 view함수에 `index.html`에 hidden이 붙은 이름들을 저장하는 리스트를 만들고,

    ```python
    check = []
    for i in range(todo_num):
        name = str(i) + 'hidden'
        check.append(name)
    ```

    key값이 그 리스트 안에 존재한다면 취소선을 추가해주는 방식으로 해결함....

    ```html
    {% for key, value in diary.todos.items %}
    <li>
        {% if key in check %} 
        <p class="done"> {{ value }}</p>
        {% else %}
        <p> {{ value }}</p>
        {% endif %} 
    </li>
    {% endfor %}
    ```

    너무 주먹구구식이었기 때문에.... 나중에 더 좋은 방법은 없는지 생각해볼 것...!!!!!
