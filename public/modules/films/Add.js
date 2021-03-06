import React from "react";
import {ajax} from "ajax";
import {Modal,Button,Form,Input,Select} from 'antd';
const FormItem = Form.Item;
const Option = Select.Option;
class Add extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            loading: false,
            visible: false
        }
    }
    showModal() {
        this.setState({
            visible: true,
        });
    }
    handleOk() {
        ajax({
          type:'post',
          url:'/users/add',
          data:this.props.form.getFieldsValue(),
          success:function(){
            this.props.show();
          }.bind(this)
        })
    setTimeout(() => {
        this.setState({
            loading: false,
            visible: false
        });
      }, 1000);
    }
    handleCancel() {
        this.setState({
            visible: false
        });
    }

    render() {
      const formItemLayout = {
        labelCol: { span: 4,offset: 4},
        wrapperCol: { span: 8 },
      };
      const { getFieldDecorator } = this.props.form;
        return <div >
        <Button type="primary" onClick={this.showModal.bind(this)}>增加</Button>
            <Modal
              visible={this.state.visible}
              title="增加"
              onOk={this.handleOk.bind(this)}
              onCancel={this.handleCancel.bind(this)}
              footer={[
                <Button key="back" size="large" onClick={this.handleCancel.bind(this)}>Return</Button>,
                <Button key="submit" type="primary" size="large" loading={this.state.loading} onClick={this.handleOk.bind(this)}>
                  Submit
                </Button>,
              ]}
            >
            <Form style={{width:'480px',height:'250px',paddingTop:'40px',margin:'auto',backgroundColor:'#ded3bb'}}>

                      <FormItem {...formItemLayout} label="用户名：" hasFeedback>
                      {getFieldDecorator('username')(
                          <Input />
                        )}
                      </FormItem>
                      <FormItem {...formItemLayout} label="邮箱" hasFeedback>
                        {getFieldDecorator('email')(
                            <Input/>
                          )}
                      </FormItem>
                      <FormItem {...formItemLayout} label="性别" hasFeedback>
                        {getFieldDecorator('gender')(
                          <Select style={{ width: '100%' }}>
                            <Option value="男">男</Option>
                            <Option value="女 ">女</Option>
                          </Select>
                          )}
                      </FormItem>
                    </Form>
            </Modal>
            </div>
    }
}
const AddForm = Form.create()(Add);
export default AddForm;
