define(['jquery', 'bootstrap', 'backend', 'table', 'form'], function ($, undefined, Backend, Table, Form) {

    var Controller = {
        index: function () {
            // 初始化表格参数配置
            Table.api.init({
                extend: {
                    index_url: 'wwh/banner/index' + location.search,
                    add_url: 'wwh/banner/add',
                    edit_url: 'wwh/banner/edit',
                    del_url: 'wwh/banner/del',
                    multi_url: 'wwh/banner/multi',
                    table: 'wwh_banner',
                    dragsort_url:'',
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
                        {field: 'title', title: __('Title')},
                        {field: 'pc_image', title: __('Pc_image'), events: Table.api.events.image, formatter: Table.api.formatter.image},
                        {field: 'phone_image', title: __('Phone_image'), events: Table.api.events.image, formatter: Table.api.formatter.image},
                        {field: 'video_image', title: __('Video_image'), events: Table.api.events.image, formatter: Table.api.formatter.image},
                        {field: 'bigfont', title: __('Bigfont')},
                        {field: 'font', title: __('Font')},
                        {field: 'url', title: __('Url'), formatter: Table.api.formatter.url},
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
                        {field: 'operate', title: __('Operate'), table: table, events: Table.api.events.operate, formatter: Table.api.formatter.operate}
                    ]
                ]
            });

            $(document).on("change", ".text-weigh", function () {
                $(this).data("params", {weigh: $(this).val()});
                Table.api.multi('', [$(this).data("id")], table, this);
                return false;
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