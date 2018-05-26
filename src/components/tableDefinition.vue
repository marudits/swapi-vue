<template>
    <table class="ui definition selectable celled table">
        <thead>
            <tr>
                <th></th>
                <th v-for="(column, index) in columnsHeader" :key="index">{{column}}</th>
            </tr>
        </thead>
        <tbody>
            <tr v-for="(row, index) in rows" :key="index" v-on:click="navigateTo(row.url)" class="row-clickable">
                <td v-for="(column, index) in columnsContent" :key="index">{{row[column]}}</td>
            </tr>
        </tbody>
    </table>
</template>

<script>
export default {
    name: 'TableDefinition',
    props: ['columns', 'rows', 'pointer'],
    created: function(){
        // set columnsContent
        this.columnsContent.push(this.pointer);
        
        // set columnHeader
        this.columnsHeader = [];
        this.columns.forEach(x => {
            if(x.key !== this.pointer){
                this.columnsHeader.push(x.value);
                this.columnsContent.push(x.key);
            }
        })
        
    },
    data: function(){
        return {
            columnsHeader: [],
            columnsContent: []
        }
    },
    methods: {
        navigateTo(url){
            let win = window.open(url, '_blank');
            win.focus();
        }
    }
}
</script>

<style lang="scss">
    .row {
        &-clickable {
            cursor: pointer;
        }
    }
</style>

