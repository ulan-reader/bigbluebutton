package org.bigbluebutton.api.model.validator;

import org.bigbluebutton.api.model.constraint.NotNull;

<<<<<<< HEAD
import jakarta.validation.ConstraintValidator;
import jakarta.validation.ConstraintValidatorContext;
=======
import javax.validation.ConstraintValidator;
import javax.validation.ConstraintValidatorContext;
>>>>>>> origin/master-dev

public class NotNullValidator implements ConstraintValidator<NotNull, Object> {

    @Override
    public void initialize(NotNull constraintAnnotation) {}

    @Override
    public boolean isValid(Object o, ConstraintValidatorContext constraintValidatorContext) {
        return !(o == null);
    }
}
