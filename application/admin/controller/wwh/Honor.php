<?php

namespace app\admin\controller\wwh;

use app\common\controller\Backend;

/**
 *
 *
 * @icon fa fa-circle-o
 */
class Honor extends Backend
{
    
    /**
     * Honor模型对象
     * @var \app\admin\model\wwh\Honor
     */
    protected $model = null;
	protected $multiFields = ['weigh'];

    public function _initialize()
    {
        parent::_initialize();
        $this->model = new \app\admin\model\wwh\Honor;
        $this->view->assign("typeList", $this->model->getTypeList());
    }


}
