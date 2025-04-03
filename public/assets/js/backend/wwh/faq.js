define(['jquery', 'bootstrap', 'backend', 'table', 'form'], function ($, undefined, Backend, Table, Form) {

    var Controller = {
        index: function () {
            // 初始化表格参数配置
            Table.api.init({
                extend: {
                    index_url: 'wwh/faq/index' + location.search,
                    add_url: 'wwh/faq/add',
                    edit_url: 'wwh/faq/edit',
                    del_url: 'wwh/faq/del',
                    multi_url: 'wwh/faq/multi',
                    import_url: 'wwh/faq/import',
                    table: 'wwh_faq',
                    dragsort_url:'',
                }
            });

            var table = $("#table");

            // 初始化表格
            table.bootstrapTable({
                url: $.fn.bootstrapTable.defaults.extend.index_url,
                pk: 'id',
                sortName: 'weigh',
                fixedColumns: true,
                fixedRightNumber: 1,
                columns: [
                    [
                        {
                            checkbox: true, formatter:function (value,row,index){
                                if (row.status == 1){
                                    return{
                                        disabled:true
                                    };
                                }
                            }
                        },
                        {field: 'id', title: __('Id')},
                        {field: 'createtime', title: __('Createtime'), operate:'RANGE', addclass:'datetimerange', autocomplete:false, formatter: Table.api.formatter.datetime},
                        {field: 'title', title: __('Title'), operate: 'LIKE'},
                        {
                            field: 'weigh',
                            title: __('Weigh'),
                            operate: false,
                            sortable: true,
                            formatter: function (value, row, index) {
                                return '<input type="text" class="form-control text-center text-weigh" data-id="' + row.id + '" value="' + value + '" style="width:50px;margin:0 auto;" />';
                            },
                            events: {
                                "dblclick .text-weigh": function (e) {
                                    e.preventDefault();
                                    e.stopPropagation();
                                    return false;
                                }
                            }
                        },
                        {field: 'updatetime', title: __('Updatetime'), operate:'RANGE', addclass:'datetimerange', autocomplete:false, formatter: Table.api.formatter.datetime},
                        {field: 'status', title: __('Status'), searchList: {"0":__('Status 0'),"1":__('Status 1')}, custom: {0: 'grey', 1: 'info'}, formatter: Table.api.formatter.flag},
                        {field: 'operate', title: __('Operate'), table: table, events: Table.api.events.operate,
                            buttons: [
                                {
                                    name: 'faudit',
                                    text: __('反审核'),
                                    title: __('反审核'),
                                    classname: 'btn btn-xs btn-danger btn-magic btn-ajax',
                                    // icon: 'fa fa-close',
                                    url: 'wwh/faq/faudit',
                                    hidden:function(row){
                                        if(row.status != '1'){
                                            return true;
                                        }
                                    },
                                    success: function (data, ret) {
                                        table.bootstrapTable('refresh');    //自动刷新
                                    },
                                }
                            ],
                            formatter: function (value, row, index) {
                                var that = $.extend({}, this);
                                var table = $(that.table).clone(true);
                                if (row.status == 1){
                                    $(table).data("operate-edit",null);
                                    $(table).data("operate-del",null);
                                }
                                that.table = table;
                                return Table.api.formatter.operate.call(that, value, row, index);
                            }}
                    ]
                ]
            });

            $(document).on("change", ".text-weigh", function () {
                $(this).data("params", {weigh: $(this).val()});
                Table.api.multi('', [$(this).data("id")], table, this);
                return false;
            });

            //审核
            $(document).on("click", ".btn-audit", function () {
                var data = table.bootstrapTable('getSelections');
                var ids = [];
                if (data.length === 0) {
                    Toastr.error("请选择操作信息");
                    return;
                }
                for (var i = 0; i < data.length; i++) {
                    ids[i] = data[i]['id']
                }
                Layer.confirm(
                    '确认选中'+ids.length+'条审核吗?',
                    {icon: 3, title: __('Warning'), offset: '40%', shadeClose: true},
                    function (index) {
                        Layer.close(index);
                        Backend.api.ajax({
                            url: "wwh/faq/audit",
                            data: {ids:ids}
                        }, function(data, ret){//成功的回调
                            if (ret.code === 1) {
                                table.bootstrapTable('refresh');
                                Layer.close(index);
                            } else {
                                Layer.close(index);
                                Toastr.error(ret.msg);
                            }
                        }, function(data, ret){//失败的回调
                            console.log(ret);
                            Layer.close(index);
                        });
                    }
                );
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
