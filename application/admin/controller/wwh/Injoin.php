<?php

namespace app\admin\controller\wwh;

use app\common\controller\Backend;

/**
 * 
 *
 * @icon fa fa-circle-o
 */
class Injoin extends Backend
{
    
    /**
     * Injoin模型对象
     * @var \app\admin\model\wwh\Injoin
     */
    protected $model = null;

    public function _initialize()
    {
        parent::_initialize();
        $this->model = new \app\admin\model\wwh\Injoin;
        $this->view->assign("statusList", $this->model->getStatusList());

    }

    //添加
    public function add() {
        return;
    }

}
