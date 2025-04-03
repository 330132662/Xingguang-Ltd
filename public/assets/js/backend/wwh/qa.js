define(['jquery', 'bootstrap', 'backend', 'table', 'form'], function ($, undefined, Backend, Table, Form) {

    var Controller = {
        index: function () {
            // 初始化表格参数配置
            Table.api.init({
                extend: {
                    index_url: 'wwh/qa/index' + location.search,
                    add_url: 'wwh/qa/add',
                    edit_url: 'wwh/qa/edit',
                    del_url: 'wwh/qa/del',
                    multi_url: 'wwh/qa/multi',
                    import_url: 'wwh/qa/import',
                    table: 'wwh_qa',
                }
            });

            var table = $("#table");

            // 初始化表格
            table.bootstrapTable({
                url: $.fn.bootstrapTable.defaults.extend.index_url,
                pk: 'id',
                sortName: 'id',
                fixedColumns: true,
                fixedRightNumber: 1,
                columns: [
                    [
                        {checkbox: true},
                        {field: 'id', title: __('Id')},
                        {field: 'createtime', title: __('Createtime'), operate:'RANGE', addclass:'datetimerange', autocomplete:false, formatter: Table.api.formatter.datetime},
                        {field: 'image', title: __('Image'), operate: false, events: Table.api.events.image, formatter: Table.api.formatter.image},
                        {field: 'name', title: __('Name'), operate: 'LIKE'},
                        {field: 'model', title: __('Model'), operate: 'LIKE'},
                        {field: 'sn', title: __('Sn'), operate: 'LIKE'},
                        {field: 'custom', title: __('Custom'), operate: 'LIKE'},
                        {field: 'phone', title: __('Phone'), operate: 'LIKE'},
                        {field: 'fhdate', title: __('Fhdate'), operate:'RANGE', addclass:'datetimerange', autocomplete:false},
                        {field: 'dqdate', title: __('Dqdate'), operate:'RANGE', addclass:'datetimerange', autocomplete:false},
                        {field: 'operate', title: __('Operate'), table: table, events: Table.api.events.operate, formatter: Table.api.formatter.operate}
                    ]
                ]
            });

            // 为表格绑定事件
            Table.api.bindevent(table);

            table.on('post-body.bs.table',function(e, settings, json, xhr){
                $(".btn-add").data("area", ['80%','80%']);
                $(".btn-editone").data("area", ['80%','80%']);
            });
        },
        add: function () {
            Controller.api.bindevent();
        },
        edit: function () {
            Controller.api.bindevent();
        },
        api: {
            bindevent: function () {
                Form.api.bindevent($("form[role=form]"));
            }
        }
    };
    return Controller;
});
