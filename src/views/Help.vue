<template>
  <app-page back title="Помощь">
    <question-item v-for="question in questions"
                   :key="question.title"
                   :question="question"
    ></question-item>
  </app-page>
</template>
<script>
import AppPage from "@/components/ui/AppPage";
import QuestionItem from "@/components/question/QuestionItem";

export default {
  setup() {
    const questions = [
      {
        title: 'Какое преимущество Composition API?',
        text: 'Самое главное преимущество - поддержка больших проектов. А именно, количество кода гораздо меньше, чем при Option Api. Плюс, хорошим бонусом являются хуки (шаблоны)'
      },
      {
        title: 'Для чего нужен VUEX?',
        text: 'Самой главной задачей VUEX является - разделить логику от UI. К примеру, в хранилище удобно хранить обращения к серверу или массивы данных, которые необходимы всему приложению.'
      }
    ]
    return {
      questions
    }
  },
  components: {AppPage, QuestionItem}
}
</script>
