<template>
<h3>Courses</h3>
<div class="container">
<table>
  <tbody>
    <tr class="item" v-for="course in courses" :key="course.id">
      <td> Course name:{{course.coursename}} </td>
      <td> Code: <a href= "" @click="editCourse(course.id)" >{{course.coursecode}}</a></td>
      <td> Max number of students:{{course.max}}</td>
      <td> registred students: {{course.registered}}</td>
      <td> avaible places: {{course.available}}</td>
      <td> No. of groups:  {{course.groupsnumbers}}</td>
    </tr>
  </tbody>
</table>

</div>



</template>

<script>

export default {
  name: "Courses",
  data() {
    return {
      courses: [],
    };
  },
  methods: {
    
    fetchRecords() {
      fetch(`http://localhost:3000/api/courses`)
        .then((response) => response.json())
        .then((data) => (this.courses = data))
        .catch((err) => console.log(err.message));
  },
  editCourse(id){
    this.$router.push(`/Acourse/${id}`)
  }
  },
  mounted() {
    this.fetchRecords();
    console.log("mounted");
  } 
};
</script>

<style scoped>

h3 {
  text-align: center;
  color: rgb(8, 110, 110);
}
.item{
  background-color: grey  ;
}
.container {
  background: #d5d7d8;
  box-shadow: 1px 2px 3px rgba(0, 0, 0, 0.2);
  margin-bottom: 30px;
  padding: 10px 20px;
  margin: auto;
  width: 40%;
  display: flex;
  justify-content: center;
}
</style>
