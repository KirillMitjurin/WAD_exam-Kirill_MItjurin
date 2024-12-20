<template>
  <div class="A Course">
    <div id="form">
      <H2 id="coursecode">System modeling - {{ course.coursename }}</H2>
      <H3>Max number of students: </H3>
      <input name="max" id="max" placeholder="max" v-model="course.max"> 
      <H3> registered students: </H3>
      <input type="text" id="registered" placeholder="registered" v-model="course.registered"> 
      <H3> avaible places: </H3>
      <input type="text" id="available" placeholder="available" v-model="course.available"> 
      <H3> number of groups: </H3>
      <input type="text" id="groupsnumbers" placeholder="groupsnumbers" v-model="course.groupsnumbers"> 
      <H3> course description: </H3>
      <input type="text" id="description" placeholder="description" v-model="course.description"> 
    </div>
    <button class= "button" @click = "UpdateCourse(courseId, course)"> Update Course </button>
  </div>

</template>


<script>
export default {
  name: "ACourse",
  data() {
    return {
      course: {
        coursename: "",
        coursecode: "",
        max: "",
        registered: "",
        available: "",
        groupsnumbers: "",
        description: "",
      },
      courseId: this.$route.params.id
    };
  },
  methods: {
    async fetchCorse() {
        fetch(`http://localhost:3000/api/courses/${this.courseId}`)
          .then((response) => response.json())
          .then((data) => {
            this.course.coursename = data.coursename;
            this.course.coursecode = data.coursecode;
            this.course.max = data.max;
            this.course.registered = data.registered;
            this.course.available = data.available;
            this.course.groupsnumbers = data.groupsnumbers;
            this.course.description = data.description;

            console.log(data)
            console.log(this.coursename)
          })
          .catch((err) => console.log(err.message));
        ;
    },
    UpdateCourse(id, course){
      fetch(`http://localhost:3000/api/courses/update/${id}`, {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({"id": id, "this.max": course.max, "registered": course.registered, "available": course.available, "groupsnumbers": course.groupsnumbers, "description": description})
      })
        .then((response) => {
          this.$router.push("/");
          console.log("response.data" + response.data);
          return response.json();
        })
        .catch((e) => {
          console.log(e);
        });
    }
  },
  mounted() {
    this.fetchCorse()
    console.log("mounted");
  }
};
</script>

<style scoped>
#form {
  max-width: 500px;
  margin: 30px auto;
  background: rgb(167, 154, 154);
  text-align: left;
  padding: 40px;
  border-radius: 10px;
  justify-content: center;
}
</style>