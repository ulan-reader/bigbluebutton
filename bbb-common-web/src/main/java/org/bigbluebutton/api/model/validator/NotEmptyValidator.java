package org.bigbluebutton.api.model.validator;

import org.bigbluebutton.api.model.constraint.NotEmpty;

<<<<<<< HEAD
import jakarta.validation.ConstraintValidator;
import jakarta.validation.ConstraintValidatorContext;
=======
import javax.validation.ConstraintValidator;
import javax.validation.ConstraintValidatorContext;
>>>>>>> origin/master-dev

public class NotEmptyValidator implements ConstraintValidator<NotEmpty, String> {

    @Override
    public void initialize(NotEmpty constraintAnnotation) {}

    @Override
    public boolean isValid(String s, ConstraintValidatorContext constraintValidatorContext) {
        if(s == null) return true;
        return !s.isEmpty();
    }
}
