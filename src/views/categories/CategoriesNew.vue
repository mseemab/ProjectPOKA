<template>
    <v-card max-width="600px" class="ml-5">
        <v-card-title></v-card-title>
        <v-card-text>
            <container>
            <v-row class="mx-2">
                <v-text-field
                label="Category Name" v-model="name"></v-text-field>
            </v-row>
            <br>
            <v-row>
                <v-btn
                fab
                v-for="buttonColor in colors"
                :key="buttonColor.name"
                :color="buttonColor.name"
                class="mx-2"
                @click.stop="category.color = buttonColor.name"
              >
                <v-icon v-if="category.color == buttonColor.name"
                  >mdi-check-bold</v-icon
                >
              </v-btn>
            </v-row>
            <br><br>
            </container>
        </v-card-text>
        <v-card-actions>
            <v-spacer></v-spacer>
            <v-btn color="teal lighten-1" dark large :to="{ name: 'categories' }">Save</v-btn>
            <v-btn large :to="{ name: 'categories' }">Cancel</v-btn>
        </v-card-actions>
    </v-card>
</template>

<script>
export default {
    name: "CategoriesNew",
    data () {
        return {
        category : {
            name: "",
            color: "red",
        },
        colors: [
        { name: "red", selected: false },
        { name: "teal", selected: false },
        { name: "cyan", selected: false },
        { name: "indigo", selected: false },
        { name: "pink", selected: false },
        { name: "amber", selected: false },
        { name: "green", selected: false },
        { name: "purple", selected: false },
      ],
    }
    }
}
</script>