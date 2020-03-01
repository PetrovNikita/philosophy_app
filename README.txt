CommitInfo:
    1. рефакторинг логики форм:
        избаление от повторяемого кода по обработке поля policyAgree. (логика была вынесена в метод controller.submitValidationField)
    2. пофикшены баги в формах по удалению элементов-нотификаций за счет удаления элементов нотификаций в методах:
        controller.submitValidationField и view.removeNotificationFormElem .
    3. добавлены обработчики ошибок при операциях с dom, и запросах к серверу.  