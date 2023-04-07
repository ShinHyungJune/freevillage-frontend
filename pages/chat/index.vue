<template>
  <div>chat gpt</div>
</template>
<script>
export default {
  name: 'chat',
  auth: false,
  data() {
    return {
      msg: ''
    }
  },
  created() {
// Define headers and params
const content = '가입하였습니다';

const headers = {
  'Authorization': 'Bearer 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',
  'Content-Type': 'application/json'
};

const params = {
  model: "gpt-3.5-turbo",
  messages: [
    {
      "role": `user`,
      "content": `${content} 라는 애국댓글에 20자 이내로 답변주세요`
    }
  ]
}

// Send request
this.$axios.post('https://api.openai.com/v1/chat/completions', params , {
  headers: headers,
})
.then(response => {
  console.log(response.data);
})
.catch(error => {
  console.error(error);
});
    
  },
  methods: {
    

  },
  mounted() {
    console.log('chat mounted')
  }
}
</script>