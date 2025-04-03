<?php

namespace app\admin\controller\wwh;

use app\common\controller\Backend;

/**
 * 
 *
 * @icon fa fa-circle-o
 */
class Faq extends Backend
{

    /**
     * Faq模型对象
     * @var \app\admin\model\wwh\Faq
     */
    protected $model = null;
	protected $multiFields = ['weigh'];

    public function _initialize()
    {
        parent::_initialize();
        $this->model = new \app\admin\model\wwh\Faq;

    }



    /**
     * 默认生成的控制器所继承的父类中有index/add/edit/del/multi五个基础方法、destroy/restore/recyclebin三个回收站方法
     * 因此在当前控制器中可不用编写增删改查的代码,除非需要自己控制这部分逻辑
     * 需要将application/admin/library/traits/Backend.php中对应的方法复制到当前控制器,然后进行修改
     */

    /**
     * 审核
     */
    public function audit($ids)
    {
        foreach ($ids as $k => $v){
            $res = $this->model->where(['id' => ['in', $ids]])->update(['status' => 1]);
            if ($res == true) {
                $this->success('审核成功');
            } else {
                $this->error('未更新任何行');
            }
        }
    }

    /**
     * 反审核
     */
    public function faudit($ids)
    {
        $res = $this->model->where(['status'=>'1','id'=>$ids])->update(['status' => 0]);
        if ($res) {
            $this->success('反审核成功');
        } else {
            $this->error('未更新任何行');
        }
    }

}
