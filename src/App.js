import React from "react";
// class 속성값을 편하게 제어하기 위한 모듈 (install 후 사용할수 있다)
import cn from 'classnames';

function App() {

  //입력한 id, pwd, email 유효성 여부를 상태값으로 관리 (object)
  const [valid, setValid] = React.useState({
    isIdValid:false,
    isPwdValid:false,
    isEmailValid:false
  });

  //현재 입력된 id, pwd, email 을 상태값으로 관리
  const [input, setInput] = React.useState({
    id:"",
    pwd:"",
    pwd2:"",
    email:""
  });

  //입력창이 한번이라도 더럽혀 졌는지 여부를 상태값으로 관리 
  const [dirty, setDirty] = React.useState({
    isIdDirty:false,
    isPwdDirty:false,
    isEmailDirty:false
  });

  //아이디가 변경 되었을때 호출되는 함수 
  const onIdChange=(e)=>{
    //현재 입력한 아이디를 읽어와서 
    let inputId=e.target.value;
    //아이디를 한번이라도 입력하면 아이디가 더럽혀 졌는지 여부를 true 로 바꿔준다. 
    setDirty({
      ...dirty,
      isIdDirty:true
    });
    //아이디를 검증할 정규표현식
    const reg=/^[a-z].{4,9}$/;
    //입력한 아이디가 정규표현식과 매칭이 되는지(통과 되는지) 확인한다. 
    const isMatch=reg.test(inputId);
    //만일 매칭되지 않는다면
    if(!isMatch){
      //아이디 유효성 여부를 false 로 바꾼다. 
      setValid({
        ...valid,
        isIdValid:false
      });
      return; //함수를 여기서 끝내라
    }
    //2. 외부 tomcat 서버에 페이지 전환없이 전송을 하고 응답을 받는다.
    fetch("http://localhost:8888/Step04_Final/users/checkid.jsp?inputId="+inputId)
    .then(function(response){
      return response.json();
    })
    .then(function(data){
      //3. 사용가능한지 여부에 따라 아이디 입력란에 is-valid or is-invalid 클래스를 적절히 추가, 제거를 한다.
      console.log(data);
      if(data.isExist){   
        setValid({
          ...valid,
          isIdValid:false
        });
      }else{
        setValid({
          ...valid,
          isIdValid:true
        });
      }
    });  
  }

  //비밀번호를 입력했을때 실행할 함수 등록
  const onPwdChange=(e)=>{
    //입력한 비밀번호를 읽어와서 
    let inputPwd=e.target.value;
    //pwd 의 상태값에 반영하고
    setInput({
      ...input,
      pwd:inputPwd
    });
    //더럽혀 졌는지 여부를 true 로 바꿔준다. 
    setDirty({
      ...dirty,
      isPwdDirty:true
    });
    //비밀번호를 검증할 정규 표현식
    const reg=/[\W]/;
    //만일 정규표현식 검증을 통과 하지 못했다면
    if(!reg.test(inputPwd)){
      setValid({
        ...valid,
        isPwdValid:false
      });
      return; //함수를 여기서 끝내라 
    }
    //만일 비밀번호 입력란과 확인란이 다르다면
    if(inputPwd != input.pwd2){
      setValid({
        ...valid,
        isPwdValid:false
      });
    }else{//같다면
      setValid({
        ...valid,
        isPwdValid:true
      });
    }
  }
  const onPwdChange2=(e)=>{
    //입력한 비밀번호를 읽어와서 
    let inputPwd=e.target.value;
    //pwd2 의 상태값에 반영하고
    setInput({
      ...input,
      pwd2:inputPwd
    });
    setDirty({
      ...dirty,
      isPwdDirty:true
    });
    //비밀번호를 검증할 정규 표현식
    const reg=/[\W]/;
    //만일 정규표현식 검증을 통과 하지 못했다면
    if(!reg.test(inputPwd)){
      setValid({
        ...valid,
        isPwdValid:false
      });
      return; //함수를 여기서 끝내라 
    }
    //만일 비밀번호 입력란과 확인란이 다르다면
    if(inputPwd != input.pwd){
      setValid({
        ...valid,
        isPwdValid:false
      });
    }else{//같다면
      setValid({
        ...valid,
        isPwdValid:true
      });
    }
  }
  //이메일을 입력했을때 호출되는 함수 
  const onEmailChange = (e)=>{
    let inputEmail=e.target.value;
    setDirty({
      ...dirty,
      isEmailDirty:true
    });
    //이메일을 검증할 정규 표현식  
    const reg=/^[0-9a-zA-Z]([-_.]?[0-9a-zA-Z])*@[0-9a-zA-Z]([-_.]?[0-9a-zA-Z])*.[a-zA-Z]{2,3}$/i;
    //만일 입력한 이메일이 정규표현식 검증을 통과 하지 못했다면
    const isEmailValid = !reg.test(inputEmail) ? false : true;
    setValid({...valid, isEmailValid});
  }

  //폼에 submit 이벤트가 일어나면 호출되는 함수 
  const handleSubmit=(e)=>{
    //여기서 e 는 react 가 넣어주는 event 객체이기 때문에 원래 event 객체와는 조금 다르다.

    //폼 유효성 여부를 알아내서 
    let isFormValid = valid.isIdValid && valid.isPwdValid && valid.isEmailValid;
    //만일 폼이 유효하지 않으면 
    if(!isFormValid){
      //기본 이벤트를(원래는 폼이 전송되어야 하는)  막아 버린다.
      e.preventDefault();
    } 
  }


  return (

    <div className="App">
      <section className="text-center">

        {/* <!-- Background image --> */}
        <div className="p-5 bg-image gradient-custom" style={{ height: "300px" }}></div>

        {/* <!-- Background image -->*/}

        <div className="card mx-4 mx-md-5 shadow-5-strong"
          style={{ marginTop: "-100px", background: "hsla(0, 0%, 100%, 0.8)", backdropFilter: "blur(30px)" }}>
          <div className="card-body py-5 px-md-5">

            <div className="row d-flex justify-content-center">
              <div className="col-lg-8">
                <h2 className="fw-bold mb-5">회원가입</h2>
                <form action="signup.jsp" method="post" onSubmit={handleSubmit}>

                  {/* <!-- id input --> */}
                  <div className="form-outline mb-4 form-list">
                    <input type="text" id="id" name="id" className={cn('form-control', { 'is-valid': valid.isIdValid, 'is-invalid': !valid.isIdValid && dirty.isIdDirty })}
                      placeholder="아이디" onChange={onIdChange} />
                    {/* 
                          ========= classname 모듈을 사용하지 않을 경우 ==============
                          className={`form-control ${valid.isIdvalid ? 'is-valid' : 'is-invalid'}`}

                          ========= classname 모듈을 사용한 경우  ==============
                          cn('처음에 넣을 클래스'), {valid.idIdValid 값이 true면,is-valid가 추가됨. }

                          className={cn('form-control', {'is-valid':valid.isIdValid, 'is-invalid': !valid.isIdValid && dirty.isIdDirty}) }
                        */}
                    <small className="form-text text-muted">영문자 소문자로 시작하고 5글자~10글자 이내로 입력하세요</small>
                    <div className="valid-feedback">사용할 수 있습니다.</div>
                    <div className="invalid-feedback">사용할 수 없는 아이디입니다.</div>
                  </div>


                  {/* <!-- Password input --> */}
                  <div className="form-outline mb-4 form-list">
                    <input type="password" id="pwd" name="pwd" className={cn('form-control', { 'is-valid': valid.isPwdValid, 'is-invalid': !valid.isPwdValid && dirty.isPwdDirty })}
                      placeholder="비밀번호" onChange={onPwdChange} />
                    <small className="form-text text-muted">특수문자를 하나이상 조합하세요.</small>
                    <div className="invalid-feedback">비밀번호를 확인하세요</div>
                  </div>
                  {/* 
                    className={cn('form-control', {'is-valid':valid.isPwdValid, 'is-invalid': !valid.isPwdValid && dirty.isPwdDirty}) }
                  */}

                  <div className="form-outline mb-4 form-list">
                    <input type="password" id="pwd2" name="pwd2" className="form-control"
                      onChange={onPwdChange2} placeholder="비밀번호 확인" />
                  </div>

                  {/* <!-- Email input --> */}
                  <div className="form-outline mb-4 form-list">
                    <input type="email" id="email" name="email"
                      onChange={onEmailChange} className={cn('form-control',{'is-valid':valid.isEmailValid, 'is-invalid': !valid.isEmailValid && dirty.isEmailDirty})}
                      placeholder="이메일" />
                  </div>

                  {/* 
                    className={cn('form-control', {'is-valid':valid.isEmailValid, 'is-invalid': !valid.isEmailValid && dirty.isEmailDirty}) } 
                  */}

                  {/*  <!-- Submit button -->*/}
                  <button type="submit" className="btn btn-primary btn-block mb-4">
                    회원가입 하기</button>
                </form>
              </div>
            </div>
          </div>
        </div>
      </section>

    </div>
  );
}

export default App;
