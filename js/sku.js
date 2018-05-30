$(function() {
    // 左侧导航
    var leftA = $(".left-nav > li > a");
    leftA.each(function () {
        var className = $(this).prop("class");
        if(className.indexOf("active") !== -1){
            $(this).siblings().show();
        }
    });
    leftA.on("click", function(){
        leftA.removeClass("active").siblings().slideUp();
        $(this).addClass("active").siblings().slideDown();
    });

    // 剩余字数
    function residualFigure(txt, residue, max){
        function Number() {
            var content = $(txt).val(),
                len = content.length,
                residual_number = max - len;
            if(residual_number < 0){
                residual_number = 0;
            }
            if(len > max){
                len = max;
            }
            $(txt).siblings().find(residue).text(len);
        }
        $(txt).on("keyup", Number);
        //判断是否需要调用该函数
        if(typeof $(txt).val() !== 'undefined'){
            Number();
        }
    }
    residualFigure(".textarea_01", ".num", 50);
    residualFigure(".textarea_02", ".num", 50);

    // 添加规格值
    $(document).on("click", ".add-value-btn", function () {
        var _html = '<span><label class="checkedBox"><i></i><input type="checkbox" class="checkbox check_item" value=""><input  class="input addIpnut" type="text" /><em class="del"></em></label><i class="upload-pic"><input type="file" /></i></span>';
        $(this).before(_html);
    });

    //添加规格列表
    $(document).on("click", ".add-speclist .btn", function () {
        var itemLen = $(".Father_Item").length;  //自增值
        var _html = '<table class="list"><tr class="Father_Title"><th class="spec">规格名: </th><th><div class="name"><input  class="input addIpnut" type="text" /></div><span class="fr del-list">删除</span></th></tr><tr class="spec-value"><td class="spec">规格值：</td><td class="Father_Item Father_Item' + itemLen + '"><span><label class="checkedBox"><i></i><input type="checkbox" class="checkbox check_all" value="全选">全选</label></span><span><label class="checkedBox"><i></i><input type="checkbox" class="checkbox check_item" value=""><input  class="input addIpnut" type="text" /><em class="del"></em></label><i class="upload-pic"><input type="file" /></i></span><a class="add-value-btn" href="javascript:;">+添加规格值</a></td></tr></table>';
        $(this).before(_html);
    });

    // 删除规格列表
    $(document).on("click", ".Father_Title .del-list", function () {
        $(this).parents(".list").remove();
        step.Creat_Table();
    });

    // 删除规格值
    $(document).on("click", ".checkedBox .del", function () {
        $(this).parents("span").remove();
        step.Creat_Table();
    });

    // 失焦事件
    $(document).on("blur", ".name .addIpnut", function () {
        var add_name = $(this).val();
        if(add_name !== ''){
            $(this).parent().text(add_name);
            step.Creat_Table();
        }
    });
    $(document).on("change", ".checkedBox .addIpnut", function () {
        var add_name = $(this).val(),
            _html = '<i></i><input type="checkbox" class="checkbox check_item" value="' + add_name + '" /><input class="addIpnut xs" type="text" value="' + add_name + '"/><em class="del"></em>';
        if(add_name !== ''){
            $(this).parents(".checkedBox").html(_html);
        }
    });

    // 全选
    function checkInputAll(selector, parents, selbox) {
        $(document).on("click", selector, function(){
            var checked = $(this).prop("checked"), choice;
            if(parents){
                choice = $(this).parents(parents).find(selbox);
            }else {
                choice = $(selbox).find(".checkedInput");
            }
            if(checked){
                $(this).siblings("i").addClass("checked");
                choice.prop("checked", true).siblings("i").addClass("checked");
            }else {
                $(this).siblings("i").removeClass("checked");
                choice.prop("checked", false).siblings("i").removeClass("checked");
            }
        });
    }
    checkInputAll(".check_all", ".list", ".check_item");
    // 单选
    function checkInputSolo(selector, parents, selAll) {
        $(document).on("click", selector, function(){
            var checked = $(this).prop("checked");
            if(checked){
                $(this).siblings("i").addClass("checked");
            }else {
                $(this).siblings("i").removeClass("checked");
            }
            var checkedAll = [];
            if(parents){
                $(this).parents(parents).find(selector).each(function(){
                    var checked = $(this).prop("checked");
                    checkedAll.push(checked);
                    if(checkedAll.indexOf(false) !== -1){
                        $(this).parents(parents).find(selAll).prop("checked", false).siblings("i").removeClass("checked");
                    }else {
                        $(this).parents(parents).find(selAll).prop("checked", true).siblings("i").addClass("checked");
                    }
                });
            }else {
                $(selector).each(function(){
                    var checked = $(this).prop("checked");
                    checkedAll.push(checked);
                    if(checkedAll.indexOf(false) !== -1){
                        $(selAll).prop("checked", false).siblings("i").removeClass("checked");
                    }else {
                        $(selAll).prop("checked", true).siblings("i").addClass("checked");
                    }
                });
            }
        });
    }
    checkInputSolo(".check_item", ".list", ".check_all");

    // 单选按钮
    $(".radio-input input").on("click", function () {
        var checked = $(this).prop("checked");
        if(checked){
            $(this).siblings("i").addClass("checked").parents(".radio-input").siblings().find("i").removeClass("checked");
        }
    });

    //规格明细初始值设置
    setTimeout(function(){step.Creat_Table()}, 1000);

    // 上传缩略图
    $(document).on("change", ".upload-pic input", function(){
        var _html = '',
            objUrl = getObjectURL(this.files[0]) ;
        if (objUrl) {
            _html += '<span class="uploadImg"><i>删除</i><img src = "' + objUrl + '"/></span>';
        }
        $(this).parent().hide().before(_html);
    }) ;
    $(document).on("click", ".uploadImg", function(){
        $(this).siblings(".upload-pic").show();
        $(this).remove();
    });
    //建立一個可存取到該file的url
    function getObjectURL(file)
    {
        var url = null ;
        if (window.createObjectURL!=undefined)
        { // basic
            url = window.createObjectURL(file);
        }
        else if (window.URL!=undefined)
        {
            // mozilla(firefox)
            url = window.URL.createObjectURL(file);
        }
        else if (window.webkitURL!=undefined) {
            // webkit or chrome
            url = window.webkitURL.createObjectURL(file);
        }
        return url ;
    }

    (function () {
        // 弹框
        var piece_frame;
        function layerFrame(selector, width, height, frameWrap) {
            $(selector).on("click", function () {
                piece_frame = layer.open({
                    type: 1,
                    title: false,
                    area: [width, height],
                    closeBtn: 0,
                    skin: 'yourclass',
                    content: $(frameWrap)
                });
            });
        }
        layerFrame(".stock-btn", '400px', '248px', '.stock-frame-wrap');

        $(".close-frame-btn, .frame-wrap .cancel").on("click", function () {
            layer.close(piece_frame);
        });

    })();

    $(document).on('change', '.choose_config label', function() {
        var parent=$(this).parents('.Father_Item');
        var _this=$('.checkbox',this);
        // 是否全选
        $('.checkbox',parent).each(function() {
            var bCheck2=true;
            if (_this.hasClass('check_all')) {
                if (_this.get(0).checked) {
                    bCheck2=true;
                    $('.check_item',parent).prop('checked', bCheck2);
                }else{
                    bCheck2=false;
                    $('.check_item',parent).prop('checked', bCheck2);
                }
                return false;
            } else {
                if ((!this.checked)&&(!$(this).hasClass('check_all'))) {
                    bCheck2 = false;
                    $('.check_all',parent).prop('checked', bCheck2);
                    return false;
                }
            }
            $('.check_all',parent).prop('checked', bCheck2);
        });

        step.Creat_Table();
    });
    var step = {
        // 信息组合
        Creat_Table: function() {
            step.hebingFunction();
            var SKUObj = $('.Father_Title');
            var arrayTile = new Array(); // 表格标题数组
            var arrayInfor = new Array(); // 盛放每组选中的CheckBox值的对象
            var arrayColumn = new Array(); // 指定列，用来合并哪些列
            var bCheck = true; // 是否全选，只有全选，表格才会生成
            var columnIndex = 0;
            $.each(SKUObj, function(i, item) {
                arrayColumn.push(columnIndex++);
                var attr = SKUObj.eq(i).find(".name").text();
                var itemName = '.Father_Item' + i;
                var bCheck2 = true; // 是否全选
                // 获取选中的checkbox的值
                var order = new Array();
                $(itemName + ' .check_item:checked').each(function() {
                    order.push($(this).val());
                    arrayTile.push(attr);
                });
                if(order.length > 0){
                    arrayInfor.push(order);
                }
            })
            //去重复
            arrayTile = unique(arrayTile);
            // 开始生成表格
            if (bCheck && arrayInfor.length > 0) {
                $('#createTable').html('');
                var table = $('<table id="process" class="columnList"></table>');
                table.appendTo($('#createTable'));
                var thead = $('<thead></thead>');
                thead.appendTo(table);
                var trHead = $('<tr></tr>');
                trHead.appendTo(thead);
                // 创建表头
                var str = '';
                $.each(arrayTile, function(index, item) {
                    str += '<th>' + item + '</th>';
                })
                str += '<th>型号</th><th>销售价格</th><th>成本价</th><th>划线价</th><th>库存</th><th>规格编码<i class="bm"></i></th>';
                trHead.append(str);
                var tbody = $('<tbody></tbody>');
                tbody.appendTo(table);

                var zuheDate = step.doExchange(arrayInfor);
                if (zuheDate.length > 0) {
                    //创建行
                    $.each(zuheDate, function(index, item) {
                        var td_array = item.split(',');
                        var tr = $('<tr></tr>');
                        tr.appendTo(tbody);
                        var str = '';
                        $.each(td_array, function(i, values) {
                            str += '<td>' + values + '</td>';
                        });
                        //初始化默认值
                        var _length = $("[name='standard_price_hidden\["+item+"\]']").length;
                        if(_length > 0){
                            var standard_price =$("[name='standard_price_hidden\["+item+"\]']").val();
                        }else{
                            var standard_price = "0.00";
                        }
                        var _length = $("[name='standard_cost_price_hidden\["+item+"\]']").length;
                        if(_length > 0){
                            var standard_cost_price =$("[name='standard_cost_price_hidden\["+item+"\]']").val();
                        }else{
                            var standard_cost_price = "0.00";
                        }
                        var _length = $("[name='standard_stock_hidden\["+item+"\]']").length;
                        if(_length > 0){
                            var standard_stock =$("[name='standard_stock_hidden\["+item+"\]']").val();
                        }else{
                            var standard_stock = "0";
                        }
                        var _length = $("[name='standard_sn_hidden\["+item+"\]']").length;
                        if(_length > 0){
                            var standard_sn =$("[name='standard_sn_hidden\["+item+"\]']").val();
                        }else{
                            var standard_sn = "";
                        }
                        str += '<td ><input name="standard_price['+index+']" class="inpbox inpbox-mini" type="text" Onkeyup="standard_price(\''+item+'\',this,\'standard_price\')"><input name="spec_id['+index+'][]"  type="hidden" value="'+item+'"></td>';
                        str += '<td ><input name="standard_cost_price['+index+']" class="inpbox inpbox-mini" type="text" Onkeyup="standard_price(\''+item+'\',this,\'standard_cost_price\')"></td>';
                        str += '<td ><input name="standard_stock['+index+']" class="inpbox inpbox-mini" type="text" Onkeyup="standard_price(\''+item+'\',this,\'standard_stock\')"></td>';
                        str += '<td ><input name="standard_sn['+index+']" class="inpbox inpbox-mini" type="text" Onkeyup="standard_price(\''+item+'\',this,\'standard_sn\')" ></td>';
                        str += '<td ><input name="standard_sn['+index+']" class="inpbox inpbox-mini" type="text" Onkeyup="standard_price(\''+item+'\',this,\'standard_sn\')" ></td>';
                        str += '<td ><input name="standard_sn['+index+']" class="inpbox inpbox-mini" type="text" Onkeyup="standard_price(\''+item+'\',this,\'standard_sn\')" ></td>';
                        tr.append(str);
                    });
                }
                //结束创建Table表
                arrayColumn.pop(); //删除数组中最后一项
                //合并单元格
                $(table).mergeCell({
                    // 目前只有cols这么一个配置项, 用数组表示列的索引,从0开始
                    cols: arrayColumn
                });
            } else {
                //未全选中,清除表格
                document.getElementById('createTable').innerHTML = "";
            }
        },
        hebingFunction: function() {
            $.fn.mergeCell = function(options) {
                return this.each(function() {
                    var cols = options.cols;
                    for (var i = cols.length - 1; cols[i] != undefined; i--) {
                        mergeCell($(this), cols[i]);
                    }
                    dispose($(this));
                })
            };

            function mergeCell($table, colIndex) {
                $table.data('col-content', ''); // 存放单元格内容
                $table.data('col-rowspan', 1); // 存放计算的rowspan值 默认为1
                $table.data('col-td', $()); // 存放发现的第一个与前一行比较结果不同td(jQuery封装过的), 默认一个"空"的jquery对象
                $table.data('trNum', $('tbody tr', $table).length); // 要处理表格的总行数, 用于最后一行做特殊处理时进行判断之用
                // 进行"扫面"处理 关键是定位col-td, 和其对应的rowspan
                $('tbody tr', $table).each(function(index) {
                    // td:eq中的colIndex即列索引
                    var $td = $('td:eq(' + colIndex + ')', this);
                    // 获取单元格的当前内容
                    var currentContent = $td.html();
                    var _length = $(this).find("td").length;
                    // 第一次时走次分支
                    if ($table.data('col-content') == '') {
                        $table.data('col-content', currentContent);
                        $table.data('col-td', $td);
                    } else {
                        // 上一行与当前行内容相同
                        if ($table.data('col-content') == currentContent && (colIndex!= _length -1)  && (colIndex!= _length -2) && (colIndex!= _length -3) && (colIndex!= _length -4)){
                            // 上一行与当前行内容相同则col-rowspan累加, 保存新值
                            var rowspan = $table.data('col-rowspan') + 1;
                            $table.data('col-rowspan', rowspan);
                            // 值得注意的是 如果用了$td.remove()就会对其他列的处理造成影响
                            $td.hide();
                            // 最后一行的情况比较特殊一点
                            // 比如最后2行 td中的内容是一样的, 那么到最后一行就应该把此时的col-td里保存的td设置rowspan
                            // 最后一行不会向下判断是否有不同的内容
                            if (++index == $table.data('trNum')){
                                $table.data('col-td').attr('rowspan', $table.data('col-rowspan'));
                            }
                        }else {
                            // col-rowspan默认为1, 如果统计出的col-rowspan没有变化, 不处理
                            if ($table.data('col-rowspan') != 1) {
                                $table.data('col-td').attr('rowspan', $table.data('col-rowspan'));
                            }
                            // 保存第一次出现不同内容的td, 和其内容, 重置col-rowspan
                            $table.data('col-td', $td);
                            $table.data('col-content', $td.html());
                            $table.data('col-rowspan', 1);
                        }
                    }
                })
            }
            // 同样是个private函数 清理内存之用
            function dispose($table) {
                $table.removeData();
            }
        },
        doExchange: function(doubleArrays) {
            // 二维数组，最先两个数组组合成一个数组，与后边的数组组成新的数组，依次类推，知道二维数组变成以为数组，所有数据两两组合
            var len = doubleArrays.length;
            if (len >= 2) {
                var arr1 = doubleArrays[0];
                var arr2 = doubleArrays[1];
                var len1 = arr1.length;
                var len2 = arr2.length;
                var newLen = len1 * len2;
                var temp = new Array(newLen);
                var index = 0;
                for (var i = 0; i < len1; i++) {
                    for (var j = 0; j < len2; j++) {
                        temp[index++] = arr1[i] + ',' + arr2[j];
                    }
                }
                var newArray = new Array(len - 1);
                newArray[0] = temp;
                if (len > 2) {
                    var _count = 1;
                    for (var i = 2; i < len; i++) {
                        newArray[_count++] = doubleArrays[i];
                    }
                }
                return step.doExchange(newArray);
            } else {
                return doubleArrays[0];
            }
        }
    }
})
function unique(arr) {
    var result = [], hash = {};
    for (var i = 0, elem; (elem = arr[i]) != null; i++) {
        if (!hash[elem]) {
            result.push(elem);
            hash[elem] = true;
        }
    }
    return result;
}
function standard_price(item,obj,type){
    var val = $(obj).val();
    var _length = $("[name='"+type+"_hidden\["+item+"\]']").length;
    if(_length > 0){
        $("[name='"+type+"_hidden\["+item+"\]']").val(val);
    }else{
        $(".control-hidden").append('<input name="'+type+'_hidden['+item+']"  type="hidden" value="'+val+'">');
    }
}
