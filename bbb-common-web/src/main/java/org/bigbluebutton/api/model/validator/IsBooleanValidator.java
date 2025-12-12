package org.bigbluebutton.api.model.validator;

import org.bigbluebutton.api.model.constraint.IsBooleanConstraint;

<<<<<<< HEAD
import jakarta.validation.ConstraintValidator;
import jakarta.validation.ConstraintValidatorContext;
=======
import javax.validation.ConstraintValidator;
import javax.validation.ConstraintValidatorContext;
>>>>>>> origin/master-dev
import java.util.Locale;

public class IsBooleanValidator implements ConstraintValidator<IsBooleanConstraint, String> {

    @Override
    public void initialize(IsBooleanConstraint constraintAnnotation) {}

    @Override
    public boolean isValid(String value, ConstraintValidatorContext context) {

        if(value == null || value.equals("")) {
            return true;
        }

        Boolean isValid = false;
        value = value.toLowerCase();

        switch(value) {
            case "true":
            case "false":
            case "0":
            case "1":
                isValid = true;
                break;
            default:
                break;
        }

        return isValid;
    }
}
