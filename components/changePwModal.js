// 설정 -> 접속 비밀번호 변경 팝업

import useToast from "hooks/toast";
import useFormState from "hooks/useFormState";
import ToastModal from "@components/toastModal";
import { useMutation } from "@tanstack/react-query";
import { updatePassword } from "utils/api";
import { useTranslation } from "react-i18next";

export default function changePwModal({ isOpen, onClose }) {
  if (!isOpen) return null;

  const { t } = useTranslation();

  const { isVisible, message, showToast } = useToast();

  const [formValues, onChange, reset] = useFormState({
    currentPassword: "",
    newPassword: "",
    newPasswordConfirm: "",
  });

  const { mutate: updatePasswordMutate } = useMutation({
    mutationFn: updatePassword,
    onSuccess: () => {
      showToast(t("비밀번호 변경이 완료되었습니다."));
      reset();
    },
    onError: (response) => {
      showToast(response.message);
    },
  });

  const onUpdatePassword = (e) => {
    e.preventDefault();
    const { currentPassword, newPassword, newPasswordConfirm } = formValues;

    if (currentPassword === "") {
      showToast(t("현재 비밀번호를 입력해주세요."));
      return;
    }

    if (newPassword === "") {
      showToast(t("신규 접속비밀번호를 입력해주세요."));
      return;
    }

    if (newPasswordConfirm === "") {
      showToast(t("접속비밀번호 확인를 입력해주세요."));
      return;
    }

    if (newPasswordConfirm !== newPassword) {
      showToast(t("신규 비밀번호와 비밀번호 확인이 일치하지 않습니다."));
      return;
    }

    updatePasswordMutate({
      currentPassword,
      newPassword,
    });
  };

  return (
    <form
      id="updatePasswordForm"
      onSubmit={onUpdatePassword}
      autoComplete="off"
    >
      <div className="modal_wrap" id="modal_setting_02">
        <div className="modal">
          <div className="modal_header">
            <h2>{t("접속 비밀번호 변경")}</h2>
            <div className="close" onClick={() => onClose()}></div>
          </div>
          <div className="modal_body">
            <div className="setting_wrap">
              <div className="border_box">
                <div className="item">
                  <p>{t("현재 비밀번호")}</p>
                  <div className="input_wrap">
                    <input
                      type="password"
                      id="currentPassword"
                      name="currentPassword"
                      placeholder={t("비밀번호를 입력해주세요.")}
                      value={formValues.currentPassword}
                      onChange={onChange}
                    />
                  </div>
                </div>
                <div className="item">
                  <p>{t("신규 접속비밀번호")}</p>
                  <div className="input_wrap">
                    <input
                      type="password"
                      id="newPassword"
                      name="newPassword"
                      placeholder={t("변경할 비밀번호를 입력해주세요.")}
                      autoComplete="new-password"
                      value={formValues.newPassword}
                      onChange={onChange}
                    />
                  </div>
                </div>
                <div className="item">
                  <p>{t("접속비밀번호 확인")}</p>
                  <div className="input_wrap">
                    <input
                      type="password"
                      id="newPasswordCom"
                      name="newPasswordConfirm"
                      placeholder={t("변경할 비밀번호를 다시 입력해주세요.")}
                      value={formValues.newPasswordConfirm}
                      onChange={onChange}
                    />
                  </div>
                </div>
              </div>
              <div className="desc">
                <p>
                  *
                  {t(
                    "계좌비밀번호를 저장하신 후 저장해제를 하지 않는 한 프로그램 종료시까지 계좌비밀번호는 저장되어 있으니 반드시 화면 잠금기능을 사용하거나 프로그램을 종료하시기 바랍니다."
                  )}
                </p>
                <p>
                  *
                  {t(
                    "프로그램 이용중 계좌비밀번호를 변경하셨을 경우에는 기존 저장되어 있던 계좌비밀번호는 저장해제 되오니 다시 계좌비밀번호를 저장하시기 바랍니다."
                  )}
                </p>
                <p>
                  *
                  {t(
                    "계좌비밀번호 저장기능은 고객님의 부주의로 의도치 않은 주문이 실행될 수 있고, 제 3자가 고객님의 정보조회 및 주문 등을 실행할 수 있으므로 사용에 각별한 주의를 당부드리며, 본 기능 이용중 발생한 의도치 않은 주문 실행 등 피해의 책임은 고객님께 있으며, 당사에 귀책사유가 없음을 고지합니다."
                  )}
                </p>
              </div>
            </div>
            <div className="modal_footer">
              <div className="btn_wrap">
                <button
                  className="btn primary_border !border-primary !text-primary hover:!bg-primary hover:!text-white"
                  type="button"
                  onClick={onClose}
                >
                  {t("취소")}
                </button>
                <button className="btn primary !bg-primary !border-primary">
                  {t("비밀번호 변경")}
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
      <ToastModal message={message} isVisible={isVisible} />
    </form>
  );
}
