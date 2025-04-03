<?php

namespace app\admin\controller\wwh;

use app\common\controller\Backend;
use think\Db;

/**
 *
 *
 * @icon fa fa-circle-o
 */
class Home extends Backend
{
    /**
     * 查看
     */
    public function index()
    {
        $data = Db::name('wwh_home')->where('id', 1)->find();
        $this->assign('data', $data);
        return $this->view->fetch();
    }
    
    
    /**
     * 关于我们修改
     */
    public function enterprise()
    {
        $s=[
            'about_title'=>input('about_title'),
            'introduction'=>input('introduction'),
            'num1'=>input('num1'),
            'unit1'=>input('unit1'),
            'introduce1'=>input('introduce1'),
            'num2'=>input('num2'),
            'unit2'=>input('unit2'),
            'introduce2'=>input('introduce2'),
            'num3'=>input('num3'),
            'unit3'=>input('unit3'),
            'introduce3'=>input('introduce3'),
			'image'=>input('image'),
        ];
        $test = Db::name('wwh_home')->where('id', 1)->find();
        if (empty($test)) {
            $data = Db::name('wwh_home')->insert($s);
        } else {
            $data = Db::name('wwh_home')->where('id', 1)->setField($s);
        }
        if ($data) {
            $this->success('保存成功');
        } else {
            $this->error('未检测到数据变动');
        }
    }
}
