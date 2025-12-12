package org.bigbluebutton.api.model.validator;

import org.bigbluebutton.api.model.constraint.Size;

<<<<<<< HEAD
import jakarta.validation.ConstraintValidator;
import jakarta.validation.ConstraintValidatorContext;
=======
import javax.validation.ConstraintValidator;
import javax.validation.ConstraintValidatorContext;
>>>>>>> origin/master-dev

public class SizeValidator implements ConstraintValidator<Size, String> {

    private int min;
    private int max;

    @Override
    public void initialize(Size constraintAnnotation) {
        min = constraintAnnotation.min();
        max = constraintAnnotation.max();
    }

    @Override
    public boolean isValid(String s, ConstraintValidatorContext constraintValidatorContext) {
        if(s == null) return true;
        return (s.length() >= min && s.length() <= max);
    }
}