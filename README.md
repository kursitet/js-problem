# Болванка для JS-задачи в edx на riot.js

Это болванка, в том смысле что никакого полезного кода она не содержит, но в ней наличествует вся необходимая для этого обвязка, и даже некоторые лишние вещи. Ее можно использовать как стартовый пакет для создания js-задачи.

Рекомендуется применять с [direnv](https://direnv.net/).

Для установки библиотек запускаем `npm install`, для сборки - `npm run
deploy`. В идеале, можно (и нужно) сделать возможность сборки отдельного
html-файла содержащего входные данные приходящие из edx для отладки, но пока
его нет.

В результате компиляции мы получаем *один* полностью самодостаточный html-файл в `build/index.html` который просто заливаем в курс.

Примерная конфигурация задачи в edx:

```
<problem>
       <script type="loncapa/python">
#<![CDATA[
def test_answer(exp, ans):
    return ans == "hi"
#]]>
       </script>
       <customresponse cfn="test_answer">
           <jsinput
               height="500"
               gradefn="getGrade"
               get_statefn="getState"
               set_statefn="setState"
               initial_state='{"selectedChoice": "incorrect1", "availableChoices":
            ["incorrect1", "correct", "incorrect2"]}'
               html_file="/static/index.html"
               title="iframe Title"/>
       </customresponse>
</problem>
```

Где initial_state используется для передачи данных в задачу, а питоновая
функция test_answer -- для проверки ответа на соответствие.

Применять осторожно, соблюдая гигиену.
