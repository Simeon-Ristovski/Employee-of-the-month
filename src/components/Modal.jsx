import "../App.css";

function Modal({
  isOpen,
  title,
  message,
  type = "success",
  onConfirm,
  onCancel,
  confirmText = "Ok",
  cancelText = "Cancel",
  showCancel = false,
}) {
  if (!isOpen) return null;

  return (
    <div className="modal-overlay">
      <div className={`modal-content modal-${type}`}>
        <h2>{title}</h2>

        <p>{message}</p>

        <div className="modal-buttons">
          {showCancel && (
            <button className="modal-cancel" onClick={onCancel}>
              {cancelText}
            </button>
          )}

          <button className="modal-confirm" onClick={onConfirm}>
            {confirmText}
          </button>
        </div>
      </div>
    </div>
  );
}

export default Modal;
